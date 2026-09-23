import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useSafety } from '../../context/SafetyContext';
import { useTacticalAudio } from '../../context/AudioContext';
import {
  MODINAGAR_CENTER,
  USER_CURRENT_LOCATION,
  MAP_LANDMARKS,
} from '../../data/modinagarMapData';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { RoadDetailDrawer } from './RoadDetailDrawer';
import { RoadSegment, Incident } from '../../types';

export const InteractiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  const {
    roadSegments,
    incidents,
    hotspots,
    selectedRoad,
    setSelectedRoad,
    selectedIncident,
    setSelectedIncident,
    activeRoute,
    showTraffic,
    showRiskLayer,
    showIncidents,
    showHotspots,
    radiusKm,
  } = useSafety();

  const audio = useTacticalAudio();
  const [hoveredRoadName, setHoveredRoadName] = useState<string | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Fix default Leaflet icon paths
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    const map = L.map(mapContainerRef.current, {
      center: [MODINAGAR_CENTER.lat, MODINAGAR_CENTER.lng],
      zoom: MODINAGAR_CENTER.zoom,
      zoomControl: true,
      attributionControl: true,
    });

    // Dark Matter CartoDB Tiles (Premium dark transportation styling)
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }
    ).addTo(map);

    const layersGroup = L.layerGroup().addTo(map);
    layersGroupRef.current = layersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Render & Update Vector Road Layers, Markers, and Traffic
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layersGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // 1. Radius Circle Overlay
    if (radiusKm) {
      const radiusCircle = L.circle(
        [USER_CURRENT_LOCATION.lat, USER_CURRENT_LOCATION.lng],
        {
          radius: radiusKm * 1000,
          color: '#3B82F6',
          weight: 1,
          opacity: 0.35,
          fillColor: '#3B82F6',
          fillOpacity: 0.04,
          dashArray: '6, 6',
        }
      );
      layerGroup.addLayer(radiusCircle);
    }

    // 2. Road Hierarchy & Risk Overlays
    roadSegments.forEach((road) => {
      const isSelected = selectedRoad?.id === road.id;

      // Road Casing Widths by Hierarchy
      let casingWeight = 8;
      let innerWeight = 4;
      if (road.roadType === 'national_highway') {
        casingWeight = 12;
        innerWeight = 7;
      } else if (road.roadType === 'arterial') {
        casingWeight = 9;
        innerWeight = 5;
      } else if (road.roadType === 'collector') {
        casingWeight = 7;
        innerWeight = 4;
      } else {
        casingWeight = 5;
        innerWeight = 3;
      }

      // Base Outer Casing (Dark contrast border)
      const casingPolyline = L.polyline(road.coordinates, {
        color: '#070D17',
        weight: isSelected ? casingWeight + 4 : casingWeight,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
      });
      layerGroup.addLayer(casingPolyline);

      // Inner Risk Color Overlay
      const roadColor = showRiskLayer ? road.color : '#475569';
      const riskPolyline = L.polyline(road.coordinates, {
        color: roadColor,
        weight: isSelected ? innerWeight + 2 : innerWeight,
        opacity: isSelected ? 1 : 0.85,
        lineCap: 'round',
        lineJoin: 'round',
      });

      // Hover & Click Interactions
      riskPolyline.on('mouseover', () => {
        riskPolyline.setStyle({ weight: innerWeight + 3, opacity: 1 });
        setHoveredRoadName(`${road.name} (${road.score}/100 - ${road.riskCategory})`);
      });

      riskPolyline.on('mouseout', () => {
        riskPolyline.setStyle({ weight: isSelected ? innerWeight + 2 : innerWeight, opacity: isSelected ? 1 : 0.85 });
        setHoveredRoadName(null);
      });

      riskPolyline.on('click', () => {
        audio.playClick();
        setSelectedRoad(road);
      });

      // Tooltip
      riskPolyline.bindTooltip(
        `<div class="font-mono text-xs p-1"><strong>${road.name}</strong><br/><span style="color: ${road.color}">${road.riskCategory} • ${road.score}/100</span></div>`,
        { sticky: true, className: 'leaflet-custom-tooltip' }
      );

      layerGroup.addLayer(riskPolyline);

      // 3. Traffic Flow Layer (Animated dashes)
      if (showTraffic) {
        const trafficDash = L.polyline(road.coordinates, {
          color: '#FFFFFF',
          weight: 2,
          opacity: 0.5,
          dashArray: '4, 12',
          className: 'traffic-flow-animation',
        });
        layerGroup.addLayer(trafficDash);
      }
    });

    // 4. Landmarks & Road Badges
    MAP_LANDMARKS.forEach((lm) => {
      const landmarkIcon = L.divIcon({
        className: 'custom-landmark-icon',
        html: `
          <div class="px-2 py-0.5 rounded-md bg-[#101A29]/90 border border-white/[0.12] text-[9px] font-mono font-bold tracking-wider text-slate-300 shadow-lg whitespace-nowrap pointer-events-none">
            ${lm.name}
          </div>
        `,
        iconSize: [100, 20],
        iconAnchor: [50, 10],
      });

      const landmarkMarker = L.marker([lm.lat, lm.lng], { icon: landmarkIcon });
      layerGroup.addLayer(landmarkMarker);
    });

    // 5. Active Incident Markers
    if (showIncidents) {
      incidents.forEach((inc) => {
        let markerBg = 'bg-rose-500';
        let symbol = '!';
        if (inc.type === 'pothole') {
          markerBg = 'bg-orange-500';
          symbol = 'P';
        } else if (inc.type === 'low_visibility') {
          markerBg = 'bg-amber-400 text-slate-950';
          symbol = 'F';
        } else if (inc.type === 'waterlogging') {
          markerBg = 'bg-sky-500';
          symbol = 'W';
        } else if (inc.type === 'obstruction') {
          markerBg = 'bg-amber-500';
          symbol = 'O';
        }

        const incidentIcon = L.divIcon({
          className: 'custom-incident-icon',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer group">
              <span class="animate-ping absolute inline-flex h-6 w-6 rounded-full ${markerBg} opacity-60"></span>
              <div class="relative flex items-center justify-center w-7 h-7 rounded-full ${markerBg} text-white font-mono font-extrabold text-[11px] shadow-lg border-2 border-[#070D17] group-hover:scale-110 transition-transform">
                ${symbol}
              </div>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([inc.lat, inc.lng], { icon: incidentIcon });
        
        marker.bindPopup(`
          <div class="p-3 min-w-[220px] bg-[#101A29] text-slate-100 rounded-xl space-y-1.5 font-sans">
            <div class="flex items-center justify-between text-[9px] font-mono uppercase">
              <span class="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">${inc.severity}</span>
              <span class="text-slate-400">${inc.reportedAt}</span>
            </div>
            <h4 class="font-display font-bold text-xs text-white">${inc.title}</h4>
            <p class="text-[11px] text-slate-300 leading-snug">${inc.description}</p>
            <div class="pt-1 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>Status: <strong class="text-emerald-400 uppercase">${inc.status}</strong></span>
              <span>👍 ${inc.upvotes || 1}</span>
            </div>
          </div>
        `, { className: 'custom-leaflet-popup' });

        layerGroup.addLayer(marker);
      });
    }

    // 6. Risk Hotspot Clusters
    if (showHotspots) {
      hotspots.forEach((hs) => {
        const hotspotCircle = L.circle(hs.coordinates, {
          radius: 280,
          color: '#A855F7',
          weight: 1.5,
          opacity: 0.7,
          fillColor: '#A855F7',
          fillOpacity: 0.15,
          dashArray: '3, 6',
        });

        hotspotCircle.bindTooltip(
          `<div class="font-mono text-xs p-1"><strong>HOTSPOT: ${hs.name}</strong><br/><span class="text-purple-400">Score: ${hs.score}/100 • 30d Incidents: ${hs.totalIncidents}</span></div>`,
          { sticky: true }
        );

        layerGroup.addLayer(hotspotCircle);
      });
    }

    // 7. Simulated Current Location Marker (Pulse Blue)
    const userLocationIcon = L.divIcon({
      className: 'custom-user-location-icon',
      html: `
        <div class="relative flex items-center justify-center">
          <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-60"></span>
          <span class="absolute inline-flex h-5 w-5 rounded-full bg-blue-500/30 border border-blue-400"></span>
          <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 border-2 border-white shadow-[0_0_12px_rgba(59,130,246,1)]"></span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const userMarker = L.marker(
      [USER_CURRENT_LOCATION.lat, USER_CURRENT_LOCATION.lng],
      { icon: userLocationIcon }
    );

    userMarker.bindTooltip(
      `<div class="font-mono text-xs p-1"><strong>YOU ARE HERE</strong><br/><span class="text-slate-300">Modinagar, Uttar Pradesh (Demo GPS)</span></div>`,
      { permanent: false }
    );
    layerGroup.addLayer(userMarker);

    // 8. Active Route Polylines (if route view is active)
    if (activeRoute) {
      const isGreen = activeRoute.riskCategory === 'SAFE';
      const routePolyline = L.polyline(activeRoute.coordinates, {
        color: isGreen ? '#22C55E' : '#F97316',
        weight: 6,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
      });
      layerGroup.addLayer(routePolyline);
    }
  }, [
    roadSegments,
    incidents,
    hotspots,
    selectedRoad,
    activeRoute,
    showTraffic,
    showRiskLayer,
    showIncidents,
    showHotspots,
    radiusKm,
    audio,
    setSelectedRoad,
  ]);

  // Recenter Handler
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [USER_CURRENT_LOCATION.lat, USER_CURRENT_LOCATION.lng],
        15,
        { animate: true }
      );
    }
  };

  // North-Up Handler
  const handleNorthUp = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(MODINAGAR_CENTER.zoom);
      mapInstanceRef.current.panTo([MODINAGAR_CENTER.lat, MODINAGAR_CENTER.lng]);
    }
  };

  // Location Search
  const handleSearchLocation = (query: string) => {
    if (!query) return;
    const lower = query.toLowerCase();
    const matchedRoad = roadSegments.find((r) =>
      r.name.toLowerCase().includes(lower)
    );
    if (matchedRoad && mapInstanceRef.current) {
      mapInstanceRef.current.panTo(matchedRoad.coordinates[0]);
      setSelectedRoad(matchedRoad);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#070D17] overflow-hidden">
      {/* Map Header Floating Controls */}
      <MapControls
        onRecenter={handleRecenter}
        onNorthUp={handleNorthUp}
        onSearchLocation={handleSearchLocation}
      />

      {/* Main Leaflet Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Hovered Road HUD Pill */}
      {hoveredRoadName && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[500] px-4 py-1.5 rounded-full bg-[#101A29]/95 backdrop-blur-md border border-white/[0.12] text-xs font-mono text-white shadow-2xl animate-in fade-in">
          {hoveredRoadName}
        </div>
      )}

      {/* Map Legend (Bottom Left) */}
      <div className="absolute bottom-20 md:bottom-6 left-4 z-[500]">
        <MapLegend />
      </div>

      {/* Live Traffic Badge (Top Right below controls) */}
      <div className="hidden sm:flex absolute bottom-20 md:bottom-6 right-4 z-[500] items-center gap-2 px-3 py-1.5 rounded-xl bg-[#101A29]/95 backdrop-blur-md border border-white/[0.12] text-[11px] font-mono text-slate-300 shadow-xl">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span>LIVE TRAFFIC SPEED:</span>
        <span className="text-emerald-400 font-bold">34 KM/H AVG</span>
      </div>

      {/* Transparent Score Road Detail Drawer */}
      <RoadDetailDrawer />
    </div>
  );
};
