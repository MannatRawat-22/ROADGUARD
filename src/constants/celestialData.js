// COSMOS - Celestial Data & Astronomical Specifications

export const PLANETS_DATA = [
  {
    id: 'mercury',
    name: 'Mercury',
    subtitle: 'The Swift Iron Planet',
    type: 'Terrestrial Planet',
    distanceFromSun: '57.9M km (0.39 AU)',
    radiusKm: 2439.7,
    relativeSize: 0.38,
    orbitPeriod: '88 Earth days',
    rotationPeriod: '58.6 Earth days',
    surfaceTemp: '-180°C to +430°C',
    gravity: '3.7 m/s² (0.38g)',
    moonsCount: 0,
    atmosphere: 'Ultra-thin exosphere (O₂, Na, H₂, He, K)',
    orbitalSpeed: '47.4 km/s',
    overview: 'The smallest planet in the Solar System and closest to the Sun. Its heavily cratered surface resembles Earth’s Moon, with immense temperature swings between day and night.',
    facts: [
      { text: 'A day on Mercury (from sunrise to sunrise) lasts 176 Earth days—twice as long as its year.', showWhy: 'mercury-day-year' },
      { text: 'Mercury has a giant iron core that makes up about 85% of the planet’s radius.', showWhy: 'mercury-core' },
      { text: 'Despite being closest to the Sun, water ice exists inside permanently shadowed polar craters.', showWhy: 'mercury-ice' }
    ],
    color: '#8c827a',
    orbitRadius: 18,
    orbitSpeed: 0.04
  },
  {
    id: 'venus',
    name: 'Venus',
    subtitle: 'Earth’s Runaway Greenhouse Twin',
    type: 'Terrestrial Planet',
    distanceFromSun: '108.2M km (0.72 AU)',
    radiusKm: 6051.8,
    relativeSize: 0.95,
    orbitPeriod: '224.7 Earth days',
    rotationPeriod: '243 Earth days (Retrograde)',
    surfaceTemp: '465°C (Hottest in Solar System)',
    gravity: '8.87 m/s² (0.90g)',
    moonsCount: 0,
    atmosphere: '96.5% CO₂, 3.5% N₂, clouds of Sulfuric Acid',
    orbitalSpeed: '35.0 km/s',
    overview: 'Shrouded beneath impenetrable clouds of toxic sulfuric acid, Venus is a superheated planetary inferno with surface pressures equivalent to 900 meters underwater on Earth.',
    facts: [
      { text: 'Venus rotates backwards compared to most planets, and its day is longer than its entire orbital year.', showWhy: 'venus-retrograde' },
      { text: 'Surface atmospheric pressure is 92 times greater than Earth’s, enough to crush a submarine.', showWhy: 'venus-pressure' },
      { text: 'The greenhouse effect traps enough heat to melt lead on the planetary surface.', showWhy: 'venus-greenhouse' }
    ],
    color: '#e3bb76',
    orbitRadius: 26,
    orbitSpeed: 0.03
  },
  {
    id: 'earth',
    name: 'Earth',
    subtitle: 'The Oasis of Life',
    type: 'Terrestrial Planet',
    distanceFromSun: '149.6M km (1.00 AU)',
    radiusKm: 6371.0,
    relativeSize: 1.0,
    orbitPeriod: '365.25 days',
    rotationPeriod: '23h 56m 4s',
    surfaceTemp: '-88°C to +58°C (Mean 15°C)',
    gravity: '9.81 m/s² (1.00g)',
    moonsCount: 1,
    atmosphere: '78% N₂, 21% O₂, 0.9% Ar, 0.04% CO₂',
    orbitalSpeed: '29.78 km/s',
    overview: 'The third planet from the Sun and the only astronomical object known to harbor life. 71% of its surface is covered by liquid water oceans shielded by a protective geomagnetic field.',
    facts: [
      { text: 'Earth is not a perfect sphere; its axial rotation creates an equatorial centrifugal bulge of 43 km.', showWhy: 'earth-bulge' },
      { text: 'Earth’s magnetic field deflects lethal solar wind particles, creating polar auroras.', showWhy: 'earth-magnetosphere' },
      { text: 'The atmosphere acts as a radiation shield and thermal blanket, keeping surface water liquid.', showWhy: 'earth-atmosphere' }
    ],
    color: '#2a75d3',
    orbitRadius: 36,
    orbitSpeed: 0.02
  },
  {
    id: 'mars',
    name: 'Mars',
    subtitle: 'The Red Frontier',
    type: 'Terrestrial Planet',
    distanceFromSun: '227.9M km (1.52 AU)',
    radiusKm: 3389.5,
    relativeSize: 0.53,
    orbitPeriod: '687 Earth days',
    rotationPeriod: '24h 37m 22s',
    surfaceTemp: '-125°C to +20°C (Mean -60°C)',
    gravity: '3.72 m/s² (0.38g)',
    moonsCount: 2,
    moons: ['Phobos', 'Deimos'],
    atmosphere: '95% CO₂, 2.6% N₂, 1.9% Ar',
    orbitalSpeed: '24.07 km/s',
    overview: 'A dusty, cold desert world with a very thin atmosphere. Home to Olympus Mons (the largest volcano in the Solar System) and Valles Marineris (a canyon system that dwarfs the Grand Canyon).',
    facts: [
      { text: 'Olympus Mons rises 22 km into the Martian sky—nearly three times the height of Mount Everest.', showWhy: 'mars-olympus' },
      { text: 'Iron oxide (rust) covering the soil gives Mars its iconic crimson-orange hue.', showWhy: 'mars-iron' },
      { text: 'Ancient river valleys and lakebeds show liquid water once flowed across the surface billions of years ago.', showWhy: 'mars-water' }
    ],
    color: '#c1440e',
    orbitRadius: 48,
    orbitSpeed: 0.015
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    subtitle: 'The Colossus of the Solar System',
    type: 'Gas Giant',
    distanceFromSun: '778.5M km (5.20 AU)',
    radiusKm: 69911.0,
    relativeSize: 2.2,
    orbitPeriod: '11.86 Earth years',
    rotationPeriod: '9h 55m 30s',
    surfaceTemp: '-110°C (Cloud tops)',
    gravity: '24.79 m/s² (2.53g)',
    moonsCount: 95,
    moons: ['Io', 'Europa', 'Ganymede', 'Callisto'],
    atmosphere: '90% H₂, 10% He, traces of Methane and Ammonia',
    orbitalSpeed: '13.07 km/s',
    overview: 'More massive than all other planets combined. Jupiter features dynamic counter-rotating atmospheric jet streams and the Great Red Spot—a storm larger than Earth raging for centuries.',
    facts: [
      { text: 'Jupiter has the shortest day of any planet, spinning on its axis once every 9.9 hours.', showWhy: 'jupiter-rotation' },
      { text: 'Its moon Ganymede is larger than Mercury and has its own internally generated magnetic field.', showWhy: 'jupiter-ganymede' },
      { text: 'The Great Red Spot has winds reaching 430 km/h and has been actively observed since 1831.', showWhy: 'jupiter-redspot' }
    ],
    color: '#d4a373',
    orbitRadius: 64,
    orbitSpeed: 0.01
  },
  {
    id: 'saturn',
    name: 'Saturn',
    subtitle: 'The Ringed Masterpiece',
    type: 'Gas Giant',
    distanceFromSun: '1.43B km (9.58 AU)',
    radiusKm: 58232.0,
    relativeSize: 1.85,
    orbitPeriod: '29.45 Earth years',
    rotationPeriod: '10h 33m 38s',
    surfaceTemp: '-140°C (Cloud tops)',
    gravity: '10.44 m/s² (1.06g)',
    moonsCount: 146,
    moons: ['Titan', 'Enceladus', 'Rhea', 'Iapetus', 'Mimas'],
    atmosphere: '96% H₂, 3% He, traces of Methane/Ethane',
    orbitalSpeed: '9.68 km/s',
    overview: 'Adorned with thousands of dazzling ringlets made of billions of chunks of pure water ice. Saturn is the only planet whose average density is lower than liquid water.',
    facts: [
      { text: 'Saturn’s average density (0.687 g/cm³) is lower than water; placed in a cosmic ocean, it would float.', showWhy: 'saturn-density' },
      { text: 'The rings span 282,000 km across but are razor thin—often just 10 to 30 meters thick.', showWhy: 'saturn-rings-thickness' },
      { text: 'Moon Enceladus sprays cryovolcanic geysers of liquid water directly into the E-ring.', showWhy: 'saturn-enceladus' }
    ],
    color: '#e0c083',
    orbitRadius: 80,
    orbitSpeed: 0.007
  },
  {
    id: 'uranus',
    name: 'Uranus',
    subtitle: 'The Sideways Ice Giant',
    type: 'Ice Giant',
    distanceFromSun: '2.87B km (19.2 AU)',
    radiusKm: 25362.0,
    relativeSize: 1.3,
    orbitPeriod: '84.0 Earth years',
    rotationPeriod: '17h 14m 24s (Retrograde)',
    surfaceTemp: '-195°C to -224°C',
    gravity: '8.69 m/s² (0.89g)',
    moonsCount: 28,
    moons: ['Titania', 'Oberon', 'Umbriel', 'Ariel', 'Miranda'],
    atmosphere: '83% H₂, 15% He, 2% Methane (gives cyan tint)',
    orbitalSpeed: '6.80 km/s',
    overview: 'An ice giant with an extreme 97.77° axial tilt—meaning it essentially rolls along its orbital path on its side. Its atmosphere is the coldest planetary atmosphere in the Solar System.',
    facts: [
      { text: 'Due to its 98° tilt, each pole experiences 42 years of continuous sunlight followed by 42 years of darkness.', showWhy: 'uranus-tilt' },
      { text: 'Atmospheric methane absorbs red light and reflects blue-green photons, giving Uranus its cyan glow.', showWhy: 'uranus-color' },
      { text: 'Miranda possesses Verona Rupes, the tallest known cliff in the solar system at 20 km high.', showWhy: 'uranus-miranda' }
    ],
    color: '#65b2c6',
    orbitRadius: 96,
    orbitSpeed: 0.004
  },
  {
    id: 'neptune',
    name: 'Neptune',
    subtitle: 'The Supersonic Storm Giant',
    type: 'Ice Giant',
    distanceFromSun: '4.50B km (30.07 AU)',
    radiusKm: 24622.0,
    relativeSize: 1.25,
    orbitPeriod: '164.8 Earth years',
    rotationPeriod: '16h 6m 36s',
    surfaceTemp: '-201°C (Mean)',
    gravity: '11.15 m/s² (1.14g)',
    moonsCount: 16,
    moons: ['Triton', 'Proteus', 'Nereid'],
    atmosphere: '80% H₂, 19% He, 1.5% Methane',
    orbitalSpeed: '5.43 km/s',
    overview: 'The most distant major planet in the Solar System. Dark, cold, and whipped by supersonic winds reaching over 2,100 km/h—the fastest atmospheric speeds recorded in the solar system.',
    facts: [
      { text: 'Neptune’s winds reach 2,160 km/h (1,340 mph)—nearly twice the speed of sound on Earth.', showWhy: 'neptune-winds' },
      { text: 'Its largest moon Triton orbits backwards (retrograde) and was likely captured from the Kuiper Belt.', showWhy: 'neptune-triton' },
      { text: 'Neptune radiates 2.6 times more thermal energy than it receives from the distant Sun.', showWhy: 'neptune-internal-heat' }
    ],
    color: '#274687',
    orbitRadius: 112,
    orbitSpeed: 0.002
  }
];

export const MOON_PHASES = [
  { id: 'new-moon', name: 'New Moon', illumination: 0, age: 0, desc: 'The Moon is positioned directly between the Earth and the Sun. The illuminated side faces away from Earth, rendering the lunar disc invisible in the night sky.' },
  { id: 'waxing-crescent', name: 'Waxing Crescent', illumination: 25, age: 3.7, desc: 'A sliver of the sunlit lunar hemisphere becomes visible on the right side as the Moon moves eastward in its orbit away from the Sun.' },
  { id: 'first-quarter', name: 'First Quarter', illumination: 50, age: 7.4, desc: 'Exactly half of the lunar surface facing Earth is illuminated. The Moon has completed one-quarter of its 29.5-day synodic cycle.' },
  { id: 'waxing-gibbous', name: 'Waxing Gibbous', illumination: 75, age: 11.1, desc: 'More than half of the visible disc is brightly sunlit, growing larger each night toward totality as lunar noon sweeps across the terrain.' },
  { id: 'full-moon', name: 'Full Moon', illumination: 100, age: 14.8, desc: 'The Earth lies approximately between the Sun and Moon. The entire near-side hemisphere is flooded with direct sunlight with zero shadows.' },
  { id: 'waning-gibbous', name: 'Waning Gibbous', illumination: 75, age: 18.5, desc: 'The illuminated portion begins to shrink from the right side as night falls over the eastern lunar Maria.' },
  { id: 'third-quarter', name: 'Third Quarter', illumination: 50, age: 22.1, desc: 'Half of the Moon is illuminated on the left side. The Moon rises around midnight and sets at midday.' },
  { id: 'waning-crescent', name: 'Waning Crescent', illumination: 25, age: 25.8, desc: 'A final crescent gleams in the pre-dawn sky before the Moon once again slips between Earth and Sun into the New Moon phase.' }
];

export const GALAXIES_DATA = [
  {
    id: 'milky-way',
    name: 'Milky Way Galaxy',
    type: 'Barred Spiral Galaxy (SBbc)',
    diameter: '100,000 light-years',
    starsCount: '100 - 400 Billion',
    centralObject: 'Sagittarius A* (4.15M Solar Masses)',
    distance: 'You are here',
    description: 'Our home stellar island. It features a central stellar bar, four major spiral arms (Perseus, Scutum-Centaurus, Sagittarius, Outer), and a supermassive black hole anchor.',
    spectralViews: ['Optical', 'Infrared', 'Radio']
  },
  {
    id: 'andromeda',
    name: 'Andromeda (M31)',
    type: 'Barred Spiral Galaxy (SA(s)b)',
    diameter: '220,000 light-years',
    starsCount: '1 Trillion Stars',
    centralObject: 'Supermassive Black Hole (140M Solar Masses)',
    distance: '2.537 Million light-years',
    description: 'The largest galaxy in the Local Group. On an inevitable collision course with the Milky Way, the two galaxies will merge in approximately 4.5 billion years into Milkomeda.',
    spectralViews: ['Optical', 'Ultraviolet', 'X-Ray']
  },
  {
    id: 'whirlpool',
    name: 'Whirlpool Galaxy (M51)',
    type: 'Grand Design Spiral Galaxy (SA(s)bc pec)',
    diameter: '76,000 light-years',
    starsCount: '100 Billion Stars',
    centralObject: 'Active Galactic Nucleus (Seyfert 2)',
    distance: '31 Million light-years',
    description: 'A spectacular grand-design spiral galaxy locked in gravitational tidal interaction with its companion dwarf galaxy NGC 5195, triggering massive bursts of new star formation.',
    spectralViews: ['Optical', 'Infrared', 'H-Alpha']
  },
  {
    id: 'sombrero',
    name: 'Sombrero Galaxy (M104)',
    type: 'Unbarred Spiral / Lenticular Galaxy (SA(s)a)',
    diameter: '50,000 light-years',
    starsCount: '800 Billion Stars',
    centralObject: 'Supermassive Black Hole (1 Billion Solar Masses)',
    distance: '31.1 Million light-years',
    description: 'Famous for its oversized central stellar bulge and an exceptionally sharp, dark equatorial dust lane that gives it the striking appearance of a Mexican sombrero hat.',
    spectralViews: ['Optical', 'Infrared', 'Composite']
  }
];

export const COSMIC_PHENOMENA = [
  {
    id: 'supernova',
    name: 'Type II Core-Collapse Supernova',
    category: 'Stellar Cataclysm',
    scale: '10⁴⁴ Joules of kinetic energy',
    duration: 'Months to Years (Light echo spans centuries)',
    description: 'When a massive star (>8 solar masses) exhausts its nuclear iron core, gravity crushes the star in milliseconds. The rebound triggers a colossal thermonuclear explosion that outshines entire galaxies.',
    mechanics: 'Iron core fusion cessation → Electron degeneracy limit reached → Core collapse to proto-neutron star → Infalling envelope shocks & detonates → Nucleosynthesis of heavy elements (Gold, Uranium).'
  },
  {
    id: 'pulsar',
    name: 'Millisecond Pulsar',
    category: 'Relativistic Stellar Corpse',
    scale: '1.4 - 2.1 Solar Masses packed into 20 km diameter',
    rotationRate: 'Up to 716 rotations per second (43,000 RPM)',
    description: 'An ultra-dense magnetized rotating neutron star that emits twin beams of intense electromagnetic synchrotron radiation from its magnetic poles like a cosmic lighthouse.',
    mechanics: 'Extreme magnetic field (10¹² Gauss) accelerates charged particles along magnetic axes. As the star rotates, beams sweep past Earth producing periodic radio/gamma pulses.'
  },
  {
    id: 'grb',
    name: 'Gamma-Ray Burst (GRB)',
    category: 'Most Luminous Event in Universe',
    scale: 'Equivalent to Sun’s entire 10-billion-year energy output in 10 seconds',
    duration: 'Milliseconds to Minutes',
    description: 'Ultra-relativistic collimated relativistic jets expelled during the birth of a black hole (hypernova collapse or binary neutron star merger). The brightest electromagnetic events in the cosmos.',
    mechanics: 'Accretion onto nascent black hole channels magnetic fields into twin relativistic jets traveling at 0.999995c. Shockwaves generate high-energy gamma photons.'
  },
  {
    id: 'aurora',
    name: 'Geomagnetic Aurora',
    category: 'Magnetospheric Interaction',
    scale: 'Altitude 80 - 600 km above Earth',
    colors: 'Emerald Green (Oxygen 557.7nm), Violet/Crimson (Nitrogen)',
    description: 'Solar coronal mass ejections inject high-velocity protons and electrons into Earth’s magnetosphere. Magnetic reconnection funnels particles into polar upper atmospheres, ionizing gases.',
    mechanics: 'Solar Wind Plasma → Lorenz force guides ions down geomagnetic field lines → Collisions with atmospheric atomic O and N₂ → Quantum electronic relaxation emits visible auroral ribbons.'
  },
  {
    id: 'gravitational-waves',
    name: 'Gravitational Waves (LIGO/Virgo)',
    category: 'Spacetime Ripple',
    scale: 'Strain amplitude h ~ 10⁻²¹ across 4 km arm interferometers',
    speed: 'Exact speed of light (c = 299,792 km/s)',
    description: 'Ripples in the very fabric of spacetime predicted by Einstein’s General Relativity. Emitted when ultra-dense binary black holes or neutron stars spiral inwards and violently merge.',
    mechanics: 'Quadrupole mass acceleration curves spacetime metric. As waves traverse space, they alternately stretch and compress space dimensions transversely.'
  },
  {
    id: 'meteor-shower',
    name: 'Perseid Meteor Shower',
    category: 'Cometary Debris Stream',
    parentBody: 'Comet 109P/Swift-Tuttle',
    speed: '59 km/s (212,000 km/h atmospheric entry)',
    description: 'As Earth passes through the orbital dust debris trail left behind by periodic comets, millimeter-sized pebble fragments enter the mesosphere, ablating into brilliant shooting stars.',
    mechanics: 'Ram-pressure compresses and superheats atmospheric air ahead of the meteoroid to 1,600°C → Rapid vaporization ionizes gas trail creating glowing incandescent meteors.'
  }
];

export const SPACE_MISSIONS = [
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    agency: 'NASA / JPL',
    launchDate: 'September 5, 1977',
    destination: 'Interstellar Space',
    currentDistance: '24.4 Billion km (163.1 AU)',
    status: 'Operational in Interstellar Medium',
    trajectoryType: 'Hyperbolic Escape Trajectory',
    milestones: [
      { date: '1979', event: 'Jupiter flyby: Discovered active volcanism on Io and Jupiter’s faint ring system.' },
      { date: '1980', event: 'Saturn flyby: Detailed Titan’s dense nitrogen atmosphere and intricate ring structures.' },
      { date: '1990', event: 'Pale Blue Dot portrait taken from 6 billion km away.' },
      { date: '2012', event: 'Crossed the Heliopause boundary, becoming humanity’s first craft in Interstellar Space.' },
      { date: 'Present', event: 'Transmitting plasma wave telemetry via Deep Space Network carrying the Golden Record.' }
    ]
  },
  {
    id: 'apollo-11',
    name: 'Apollo 11',
    agency: 'NASA',
    launchDate: 'July 16, 1969',
    destination: 'Lunar Surface (Mare Tranquillitatis)',
    currentDistance: 'Historic Mission Completed',
    status: 'Landed first humans on the Moon (July 20, 1969)',
    trajectoryType: 'Translunar Injection & Free-Return Trajectory',
    milestones: [
      { date: 'July 16', event: 'Saturn V liftoff from Launch Complex 39A with Armstrong, Aldrin, Collins.' },
      { date: 'July 19', event: 'Lunar Orbit Insertion burn behind the Moon.' },
      { date: 'July 20', event: 'Lunar Module Eagle touch down: "Houston, Tranquility Base here. The Eagle has landed."' },
      { date: 'July 21', event: 'First human EVA on lunar soil; gathered 21.5 kg of pristine lunar rock and regolith.' },
      { date: 'July 24', event: 'Command Module Columbia splashdown in Pacific Ocean.' }
    ]
  },
  {
    id: 'jwst',
    name: 'James Webb Space Telescope (JWST)',
    agency: 'NASA / ESA / CSA',
    launchDate: 'December 25, 2021',
    destination: 'Sun-Earth L2 Lagrange Point (1.5M km)',
    currentDistance: '1.5 Million km from Earth',
    status: 'Active Deep Field Science Observations',
    trajectoryType: 'Halo Orbit around Sun-Earth L2',
    milestones: [
      { date: 'Dec 2021', event: 'Ariane 5 precision launch from French Guiana.' },
      { date: 'Jan 2022', event: 'Complex deployment of 5-layer tennis-court sized sunshield & 18 gold hexagonal mirror segments.' },
      { date: 'July 2022', event: 'First Deep Field image revealed oldest galaxies formed 13.4 billion years ago.' },
      { date: 'Present', event: 'Spectroscopic detection of water, methane, and CO₂ in atmospheres of habitable-zone exoplanets.' }
    ]
  },
  {
    id: 'perseverance',
    name: 'Perseverance & Ingenuity',
    agency: 'NASA / JPL',
    launchDate: 'July 30, 2020',
    destination: 'Mars (Jezero Crater)',
    currentDistance: '225 Million km (Mars surface)',
    status: 'Actively drilling sample cores & exploring ancient delta',
    trajectoryType: 'Type I Hohmann Interplanetary Transfer Orbit',
    milestones: [
      { date: 'Feb 2021', event: '7 Minutes of Terror: Guided atmospheric entry, supersonic parachute, and Sky Crane touchdown.' },
      { date: 'April 2021', event: 'Ingenuity Helicopter achieved the first powered, controlled flight on another planet.' },
      { date: '2022-2024', event: 'Sealed 24+ geological sample tubes destined for future Mars Sample Return mission.' },
      { date: 'Present', event: 'Ascending the rim of Jezero crater to study billion-year-old crustal rocks.' }
    ]
  },
  {
    id: 'parker-solar-probe',
    name: 'Parker Solar Probe',
    agency: 'NASA',
    launchDate: 'August 12, 2018',
    destination: 'Solar Corona',
    currentDistance: 'Perihelion sweeps inside 6.1M km from Sun',
    status: 'Fastest human-made object in history (692,000 km/h)',
    trajectoryType: '7 Venus Gravity Assist Resonant Solar Orbit',
    milestones: [
      { date: '2018-2024', event: 'Repeated Venus gravity assists progressively dropping orbital perihelion.' },
      { date: '2021', event: 'First spacecraft to officially "touch the Sun" by crossing the Alfvén critical surface.' },
      { date: '2025-2026', event: 'Reaching terminal speeds of 700,000 km/h shielded by 11.4 cm carbon-composite heat shield at 1,400°C.' }
    ]
  }
];

export const CONSTELLATIONS_DATA = [
  {
    id: 'orion',
    name: 'Orion (The Hunter)',
    season: 'Winter (Northern Hemisphere)',
    brightestStar: 'Rigel (Beta Orionis, Blue Supergiant)',
    notableStar2: 'Betelgeuse (Alpha Orionis, Red Supergiant)',
    deepSkyObject: 'Orion Nebula (M42 - Stellar Nursery)',
    story: 'One of the most prominent and recognizable star patterns in the night sky. The distinctive Belt of Orion consists of three luminous stars: Alnitak, Alnilam, and Mintaka.',
    stars: [
      { name: 'Betelgeuse', color: '#ff7b47', mag: 0.5, pos: [-4, 6, -10] },
      { name: 'Rigel', color: '#88c8ff', mag: 0.1, pos: [4, -6, -10] },
      { name: 'Bellatrix', color: '#b9e0ff', mag: 1.6, pos: [4, 5, -10] },
      { name: 'Saiph', color: '#a6d8ff', mag: 2.0, pos: [-3.5, -5.5, -10] },
      { name: 'Alnitak', color: '#a6d8ff', mag: 1.7, pos: [-1.5, 0, -10] },
      { name: 'Alnilam', color: '#a6d8ff', mag: 1.7, pos: [0, 0, -10] },
      { name: 'Mintaka', color: '#a6d8ff', mag: 2.2, pos: [1.5, 0, -10] }
    ],
    lines: [
      [0, 4], [4, 5], [5, 6], [6, 2], [0, 2], [4, 3], [6, 1], [3, 1]
    ]
  },
  {
    id: 'ursa-major',
    name: 'Ursa Major (The Great Bear / Big Dipper)',
    season: 'Circumpolar (Visible Year-Round)',
    brightestStar: 'Alioth (Epsilon Ursae Majoris)',
    pointerStars: 'Merak & Dubhe (Point directly to Polaris)',
    deepSkyObject: 'Bode’s Galaxy (M81) & Cigar Galaxy (M82)',
    story: 'The celestial clock of the Northern hemisphere. The outer two stars of the Big Dipper bowl (Merak and Dubhe) form the universal pointer vector that guides travelers straight to the North Star (Polaris).',
    stars: [
      { name: 'Dubhe', color: '#ffe4b5', mag: 1.8, pos: [3, 4, -10] },
      { name: 'Merak', color: '#ffffff', mag: 2.3, pos: [3, 1, -10] },
      { name: 'Phecda', color: '#ffffff', mag: 2.4, pos: [0, 1, -10] },
      { name: 'Megrez', color: '#ffffff', mag: 3.3, pos: [0, 4, -10] },
      { name: 'Alioth', color: '#ffffff', mag: 1.7, pos: [-2.5, 5, -10] },
      { name: 'Mizar', color: '#ffffff', mag: 2.2, pos: [-5, 6.5, -10] },
      { name: 'Alkaid', color: '#a6d8ff', mag: 1.8, pos: [-7.5, 8, -10] }
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]
    ]
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia (The Queen)',
    season: 'Autumn / Winter',
    brightestStar: 'Schedar (Alpha Cassiopeiae)',
    pattern: 'Distinctive "W" or "M" Shape',
    deepSkyObject: 'Pacman Nebula (NGC 281)',
    story: 'A radiant circumpolar constellation named after the vain queen of Greek mythology. Its five bright stars trace an iconic cosmic W across the northern Milky Way.',
    stars: [
      { name: 'Caph', color: '#ffe4b5', mag: 2.2, pos: [-6, 2, -10] },
      { name: 'Schedar', color: '#ffb366', mag: 2.2, pos: [-3, -1, -10] },
      { name: 'Gamma Cas', color: '#88c8ff', mag: 2.1, pos: [0, 2, -10] },
      { name: 'Ruchbah', color: '#ffffff', mag: 2.6, pos: [3, -1, -10] },
      { name: 'Segin', color: '#a6d8ff', mag: 3.3, pos: [6, 2, -10] }
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4]
    ]
  }
];

export const COSMIC_CALENDAR_EVENTS = [
  {
    id: 'eclipse-2026',
    title: 'Total Solar Eclipse',
    date: 'August 12, 2026',
    category: 'Solar Eclipse',
    status: 'Confirmed Major Astronomical Event',
    visibility: 'Greenland, Iceland, Spain, Arctic',
    totalityDuration: '2 minutes 18 seconds',
    details: 'The first total solar eclipse visible from mainland Europe since 1999. The path of totality crosses Reykjavik, Iceland, and northern Spain just before sunset.'
  },
  {
    id: 'perseids-annual',
    title: 'Perseid Meteor Shower Peak',
    date: 'August 12–13 (Annual)',
    category: 'Meteor Shower',
    status: 'Annual Peak Shower',
    visibility: 'Global Northern Hemisphere',
    zenithHourlyRate: '100 meteors per hour',
    details: 'Swift and bright meteors originating from Comet Swift-Tuttle. Known for leaving long persistent trains and frequent incandescent fireballs.'
  },
  {
    id: 'artemis-3',
    title: 'NASA Artemis III Lunar South Pole Landing',
    date: 'Mid 2026 – 2027',
    category: 'Space Mission Launch',
    status: 'Upcoming Mission',
    visibility: 'Human Spaceflight Mission',
    destination: 'Lunar South Pole (Shackleton Rim)',
    details: 'First crewed lunar surface landing since Apollo 17 in 1972, landing the first woman and first person of color on the Moon near permanently shadowed ice deposits.'
  },
  {
    id: 'jupiter-opposition',
    title: 'Jupiter at Opposition',
    date: 'January 2027',
    category: 'Planetary Event',
    status: 'Orbital Alignment',
    visibility: 'Visible all night worldwide',
    magnitude: '-2.7 (Brighter than any star)',
    details: 'Earth passes directly between Jupiter and the Sun. The gas giant appears at its largest and brightest in telescopes, with all four Galilean moons clearly aligned.'
  },
  {
    id: 'solar-eclipse-2027',
    title: 'Great North African Solar Eclipse of the Century',
    date: 'August 2, 2027',
    category: 'Solar Eclipse',
    status: 'Confirmed Major Astronomical Event',
    visibility: 'Gibraltar, Morocco, Algeria, Tunisia, Egypt (Luxor), Saudi Arabia',
    totalityDuration: '6 minutes 23 seconds (Extraordinary Totality)',
    details: 'One of the longest total solar eclipses of the 21st century. The path of totality directly overflies the historic Valley of the Kings in Luxor, Egypt under cloudless skies.'
  },
  {
    id: 'geminids-annual',
    title: 'Geminid Meteor Shower Peak',
    date: 'December 13–14 (Annual)',
    category: 'Meteor Shower',
    status: 'King of Meteor Showers',
    visibility: 'Both Hemispheres',
    zenithHourlyRate: '120–150 multi-colored meteors per hour',
    details: 'Unlike most showers caused by comets, the Geminids originate from the rocky asteroid 3200 Phaethon. Meteors are dense, slow-moving, and intensely colorful.'
  }
];

export const DISCOVERIES_LIST = [
  { id: 'earth-oasis', title: 'The Living Planet', category: 'Planetary', desc: 'Discovered Earth’s atmospheric scattering halo and equatorial centrifugal bulge.' },
  { id: 'lunar-craters', title: 'Lunar Regolith', category: 'Moon', desc: 'Explored the cratered highlands and calculated real-time solar illumination angles.' },
  { id: 'solar-totality', title: 'Crown of the Sun', category: 'Eclipse', desc: 'Witnessed 100% solar totality, revealing the magnetic coronal streamer field.' },
  { id: 'saturn-rings', title: 'Cassini Division', category: 'Planets', desc: 'Navigated the icy billion-particle ring plane and moons of Saturn.' },
  { id: 'solar-plasma', title: 'Thermonuclear Core', category: 'Sun', desc: 'Triggered a coronal mass ejection plasma eruption into interplanetary space.' },
  { id: 'polaris-guide', title: 'North Celestial Pole', category: 'Stars', desc: 'Aligned navigation vector to Polaris via the Ursa Major pointer stars.' },
  { id: 'milky-way-core', title: 'Galactic Horizon', category: 'Galaxies', desc: 'Traversed 100,000 light-years of spiral arms toward Sagittarius A*.' },
  { id: 'stellar-nursery', title: 'Pillars of Creation', category: 'Nebulae', desc: 'Dived into volumetric interstellar gas clouds birthing newborn protostars.' },
  { id: 'event-horizon', title: 'Singularity Boundary', category: 'Black Hole', desc: 'Approached the photon sphere and witnessed extreme gravitational lensing.' },
  { id: 'pulsar-beacon', title: 'Cosmic Lighthouse', category: 'Phenomena', desc: 'Detected 40,000 RPM synchrotron radiation beam pulses from a neutron star.' },
  { id: 'interstellar-voyage', title: 'Beyond the Heliopause', category: 'Missions', desc: 'Tracked Voyager 1 crossing into the pristine interstellar medium.' },
  { id: 'deep-future', title: 'Cosmic Horizons', category: 'The Future', desc: 'Gazed into the quiet eternity of deep space and timeless cosmic evolution.' }
];
