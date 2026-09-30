export interface ResearchArea {
  id: string;
  title: string;
  tagline: string;
  category: 'Electromagnetics' | 'Materials' | 'Next-Gen Wireless' | 'Applied AI & Interdisciplinary';
  icon: string;
  description: string;
  keyTopics: string[];
  applications: string[];
  collaboratingInstitutes: string[];
  activeProjectsCount: number;
}

export interface InstitutionalPartner {
  id: string;
  name: string;
  location: string;
  country: string;
  category: 'Existing Association' | 'Proposed Collaboration' | 'Potential Collaboration';
  statusBadge: string;
  logoText: string;
  description: string;
  collaborationScopes: string[];
  keyContacts: string;
}

export interface CollaborationActivity {
  id: string;
  title: string;
  icon: string;
  category: 'Academic' | 'Research' | 'Capacity Building' | 'Innovation';
  targetAudience: string;
  description: string;
  deliverables: string[];
  applicationMode: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  type: 'IEEE Journal / Transactions' | 'Elsevier / Springer' | 'International Conference' | 'Patent';
  citations?: number;
  highlight?: boolean;
}

export const researcherProfile = {
  fullName: "Dr. Praveen Kumar Sharma",
  designation: "Associate Professor & Lead Researcher",
  specialization: "Metamaterials, Microwave & Wearable Antennas, Flexible RF Systems & Interdisciplinary Applied Sensing",
  email: "praveen.sharma@research.edu.in",
  alternateEmail: "ahujaslock321@gmail.com",
  phone: "+91 98765 43210",
  location: "Pune / Pilani / Delhi NCR, India",
  googleScholar: "https://scholar.google.com",
  researchGate: "https://researchgate.net",
  orcid: "0000-0002-XXXX-XXXX",
  scopusId: "5720XXXXXXXX",
  hIndex: 16,
  citationsCount: "850+",
  patentsCount: 4,
  publicationsCount: "45+",
  projectsFunding: "₹85+ Lakhs",
  
  aboutSummary: 
    "Dr. Praveen Kumar Sharma is an accomplished researcher and academician specializing in the domains of Metamaterials, Metasurfaces, Flexible & Wearable Antennas, Millimeter-Wave 5G/6G RF circuits, and Interdisciplinary Remote Sensing. Having completed his Ph.D. from BITS Pilani and Post-Doctoral research at Seoul National University of Science and Technology (SeoulTech, South Korea), Dr. Sharma has led high-impact sponsored research projects, authored over 45 peer-reviewed articles in high-impact IEEE, Elsevier, and Nature-indexed journals, and actively fosters academic-industry partnerships across India, South Korea, and Europe.",

  academicQualifications: [
    {
      degree: "Post-Doctoral Fellowship (PDF)",
      institution: "Seoul National University of Science and Technology (SeoulTech)",
      location: "Seoul, Republic of Korea",
      year: "2018 – 2019",
      focus: "Flexible Metamaterial Absorbers & Wearable Bio-Radar Antennas"
    },
    {
      degree: "Doctor of Philosophy (Ph.D.) in ECE",
      institution: "Birla Institute of Technology and Science (BITS Pilani)",
      location: "Pilani, Rajasthan, India",
      year: "2014 – 2018",
      focus: "Design and Characterization of Novel Metamaterial Structures for Microwave Antenna Applications"
    },
    {
      degree: "Master of Technology (M.Tech) in Microwave & Optical Communication",
      institution: "Premier Technical University",
      location: "India",
      year: "2011 – 2013",
      focus: "First Class with Distinction (Gold Medalist Track)"
    },
    {
      degree: "Bachelor of Technology (B.Tech) in Electronics & Communication",
      institution: "State Technological University",
      location: "India",
      year: "2007 – 2011",
      focus: "First Class with Honors"
    }
  ],

  professionalExperience: [
    {
      role: "Associate Professor & Research Lead",
      institution: "Department of Electronics & Communication Engineering",
      period: "2021 – Present",
      responsibilities: [
        "Head of Advanced Electromagnetics & Wearable Sensor Technology Lab.",
        "Principal Investigator for sponsored research grants from government and industry.",
        "Guiding 4 Ph.D. scholars, 8 M.Tech dissertations, and undergraduate innovation groups."
      ]
    },
    {
      role: "Post-Doctoral Research Scientist",
      institution: "Department of Electrical & Information Engineering, SeoulTech",
      location: "Seoul, South Korea",
      period: "2018 – 2020",
      responsibilities: [
        "Conducted high-frequency metamaterial prototyping and anechoic chamber measurements.",
        "Collaborated with South Korean National Research Foundation (NRF) sponsored initiatives."
      ]
    },
    {
      role: "Assistant Professor",
      institution: "B.K. Birla Institute of Engineering & Technology (BKBIET)",
      location: "Pilani, Rajasthan",
      period: "2014 – 2018",
      responsibilities: [
        "Taught Microwave Engineering, Electromagnetic Theory, and Antenna Design.",
        "Mentored student IEEE Antenna and Propagation Society (APS) chapter."
      ]
    }
  ],

  awardsAndHonors: [
    { title: "Best Researcher Award in Microwave & Antennas", year: "2023", issuer: "International Academic Excellence Forum" },
    { title: "Brain Korea (BK21 Plus) Post-Doctoral Fellowship", year: "2018", issuer: "Ministry of Education & NRF, South Korea" },
    { title: "CSIR Senior Research Fellowship (SRF)", year: "2016", issuer: "Council of Scientific and Industrial Research, Govt. of India" },
    { title: "IEEE Senior Member Elevation", year: "2022", issuer: "IEEE Antenna and Propagation Society (APS)" },
    { title: "Best Paper Award", year: "2020", issuer: "IEEE International Microwave & RF Conference (IMaRC)" }
  ],

  professionalMemberships: [
    "Senior Member, IEEE (Institute of Electrical and Electronics Engineers)",
    "Life Member, IETE (Institution of Electronics and Telecommunication Engineers)",
    "Member, IEEE Antennas and Propagation Society (IEEE AP-S)",
    "Member, IEEE Microwave Theory and Technology Society (IEEE MTT-S)",
    "Fellow / Member, Optical Society / Material Research Society (MRS)"
  ]
};

export const researchAreasData: ResearchArea[] = [
  {
    id: "antennas",
    title: "Wearable & Flexible Antennas",
    tagline: "Biocompatible PDMS, textile, and paper-based conformable radiating systems",
    category: "Electromagnetics",
    icon: "Radio",
    description: "Engineering low-profile, flexible, and stretchable antennas capable of maintaining stable radiation efficiency under severe mechanical bending, crumpling, and human-body proximity.",
    keyTopics: ["Polymer/PDMS Substrates", "Conductive E-Textiles", "SAR Reduction for On-Body Comm", "Energy Harvesting Antennas"],
    applications: ["Continuous Healthcare Telemetry", "Military Smart Uniforms", "Sports Biometrics", "Implantable Sensors"],
    collaboratingInstitutes: ["SeoulTech (S. Korea)", "CSIR-CEERI", "BITS Pilani"],
    activeProjectsCount: 3
  },
  {
    id: "rf-microwave",
    title: "RF & Microwave Engineering",
    tagline: "High-frequency passive components, filters, phase shifters & power dividers",
    category: "Electromagnetics",
    icon: "Activity",
    description: "Design, full-wave electromagnetic simulation (CST Studio, Ansys HFSS), and physical anechoic chamber characterization of planar and 3D microwave components operating from Sub-6 GHz to millimeter-wave frequencies.",
    keyTopics: ["Substrate Integrated Waveguides (SIW)", "Tunable Bandpass Filters", "High-Gain Phased Arrays", "Low Insertion-Loss Phase Shifters"],
    applications: ["Radar Altimeters", "Point-to-Point Terrestrial Links", "Satellite Ground Terminals", "Electronic Warfare"],
    collaboratingInstitutes: ["CSIR-CEERI Pilani", "IIT Bombay"],
    activeProjectsCount: 2
  },
  {
    id: "flexible-electronics",
    title: "Flexible & Printed Electronics",
    tagline: "Additive manufacturing and screen-printed organic conductors",
    category: "Materials",
    icon: "Cpu",
    description: "Developing lightweight electronic circuits utilizing inkjet-printed silver nanoparticles, conductive polymers (PEDOT:PSS), and carbon nanotube inks on flexible polyethylene terephthalate (PET) and polyimide films.",
    keyTopics: ["Roll-to-Roll (R2R) Printing", "Conductive Nanomaterials", "Thermal Annealing Optimization", "Mechanical Fatigue Life Cycle"],
    applications: ["Smart Packaging & Logistics", "Conformal Avionics Skins", "Foldable Displays", "Electronic Skin (E-Skin)"],
    collaboratingInstitutes: ["SeoulTech", "BITS Pilani"],
    activeProjectsCount: 2
  },
  {
    id: "metamaterials",
    title: "Electromagnetic Metamaterials",
    tagline: "Engineered sub-wavelength unit cells with negative permittivity and permeability",
    category: "Materials",
    icon: "Layers",
    description: "Theoretical synthesis and physical validation of artificial composite media offering customized refractive indices, electromagnetic cloaking, broadband perfect absorption, and super-resolution lensing.",
    keyTopics: ["Split-Ring Resonators (SRR)", "Double-Negative (DNG) Media", "Zero-Index Metamaterials (ZIM)", "Broadband Microwave Absorbers"],
    applications: ["Radar Cross-Section (RCS) Reduction", "Stealth Technologies", "High-Isolation MIMO Systems", "Electromagnetic Shielding"],
    collaboratingInstitutes: ["BITS Pilani", "Université de Poitiers (France)"],
    activeProjectsCount: 4
  },
  {
    id: "metasurfaces",
    title: "Reconfigurable Metasurfaces & RIS",
    tagline: "Dynamic phase/amplitude manipulation for 6G smart radio environments",
    category: "Materials",
    icon: "Grid",
    description: "2D equivalents of metamaterials incorporating PIN diodes, varactors, and phase-change materials (PCM) to dynamically beamform, steer, and reflect electromagnetic wavefronts programmatically.",
    keyTopics: ["Reconfigurable Intelligent Surfaces (RIS)", "Holographic Beamforming", "Polarization Converters", "Frequency Selective Surfaces (FSS)"],
    applications: ["6G Wireless Propagation Enablers", "Indoor Dead-Zone Elimination", "Satellite Reflectarrays", "Terahertz Lenses"],
    collaboratingInstitutes: ["IIT Bombay", "SeoulTech"],
    activeProjectsCount: 3
  },
  {
    id: "5g-6g",
    title: "Next-Gen 5G & 6G Wireless Systems",
    tagline: "Massive MIMO, sub-terahertz beam steering and ultra-reliable communications",
    category: "Next-Gen Wireless",
    icon: "Wifi",
    description: "Architecting wideband antenna arrays operating in mmWave bands (28 GHz, 38 GHz, 60 GHz) and Sub-THz bands (140-300 GHz) with ultra-compact form factors for dense urban infrastructure and user equipment.",
    keyTopics: ["Massive MIMO 64T64R Arrays", "Sub-THz Waveguide Packaging", "Integrated Sensing & Communication (ISAC)", "Low-Latency RF Front-Ends"],
    applications: ["Autonomous Vehicle V2X", "Ultra-High Definition Holographic Streaming", "Tactile Internet", "Urban Small Cells"],
    collaboratingInstitutes: ["MIT-ADT University", "BITS Pilani"],
    activeProjectsCount: 2
  },
  {
    id: "ai-ml-em",
    title: "AI/ML in Electromagnetics & Antenna Synthesis",
    tagline: "Surrogate modeling, deep neural inverse design and generative optimization",
    category: "Applied AI & Interdisciplinary",
    icon: "Sparkles",
    description: "Accelerating computational electromagnetic simulations from hours to milliseconds using Physics-Informed Neural Networks (PINNs), Gaussian Process Regression, and Reinforcement Learning for automated antenna optimization.",
    keyTopics: ["Surrogate Fast EM Modeling", "Deep Generative Inverse Design", "Reinforcement Learning Beam Steering", "Anomaly Detection in RF Links"],
    applications: ["Rapid Prototyping", "Autonomous Antenna Auto-Tuning", "Cognitive Radio Networks", "Predictive Signal Fading Recovery"],
    collaboratingInstitutes: ["MIT-ADT University", "IIT Bombay"],
    activeProjectsCount: 3
  },
  {
    id: "iot-sensors",
    title: "Environmental IoT & Smart Sensors",
    tagline: "Low-power edge sensors and remote telemetry networks",
    category: "Applied AI & Interdisciplinary",
    icon: "Gauge",
    description: "Designing self-powered wireless sensor nodes integrating energy harvesting (ambient RF, solar, thermal) for long-range environmental telemetry (LoRaWAN, NB-IoT) in agriculture and urban river monitoring.",
    keyTopics: ["Ultra-Low-Power Edge Nodes", "Energy Harvesting RF Harvesters", "Water Quality Optical Sensors", "Distributed Sensor MESH"],
    applications: ["River Pollution Early Warning", "Precision Agriculture", "Smart City Air Quality", "Industrial Asset Tracking"],
    collaboratingInstitutes: ["CSIR-CEERI", "MIT-ADT University"],
    activeProjectsCount: 3
  },
  {
    id: "semiconductor-electronics",
    title: "Semiconductor Devices & Nano-Electronics",
    tagline: "GaN, GaAs, and novel 2D material high-electron-mobility transistors (HEMT)",
    category: "Materials",
    icon: "Zap",
    description: "Investigating solid-state semiconductor physics for high-power, high-frequency solid-state power amplifiers (SSPA) and nanoscale switching devices resilient to thermal and radiation stress.",
    keyTopics: ["GaN HEMT Power Amplifiers", "2D Transition Metal Dichalcogenides", "Thermal Dissipation Packaging", "Radiation-Hardened Circuits"],
    applications: ["Aerospace Radars", "Electric Vehicle Fast Inverters", "Deep-Space Probes", "Satellite Transponders"],
    collaboratingInstitutes: ["BITS Pilani", "CSIR-CEERI"],
    activeProjectsCount: 2
  },
  {
    id: "interdisciplinary-biocircularity",
    title: "Interdisciplinary Geospatial & Biocircular Intelligence",
    tagline: "Satellite Earth Observation, water hyacinth monitoring and circular biomass valorization",
    category: "Applied AI & Interdisciplinary",
    icon: "Globe2",
    description: "Pioneering interdisciplinary convergence of Multi-Spectral Satellite remote sensing (Sentinel-2, Landsat), microwave hydrography, and environmental bioeconomy models to monitor Ganga invasive aquatic flora and quantify bio-CNG recovery.",
    keyTopics: ["Multi-Spectral Macrophyte Indexing (NDVI/FAI)", "10m Mesh Spatial Hydro-Telemetry", "Anaerobic Digestion Stoichiometry", "Zero-Waste Circular Valuation"],
    applications: ["River Basin Cleanup Optimization", "Clean Bio-CNG Energy Plants", "Carbon Offset Credit Verification", "Soil Conditioning Fertilizers"],
    collaboratingInstitutes: ["National Mission for Clean Ganga (NMCG) Linkage", "MIT-ADT University", "BITS Pilani"],
    activeProjectsCount: 1
  }
];

export const academicCollaborationData: CollaborationActivity[] = [
  {
    id: "faculty-exchange",
    title: "Faculty Exchange & Sabbaticals",
    icon: "Users",
    category: "Academic",
    targetAudience: "Professors, Associate/Assistant Professors, Post-Docs",
    description: "Short-term visiting professorships, guest lecture series, and sabbatical research stays focusing on advanced electromagnetics and flexible electronics.",
    deliverables: ["Joint lecture modules", "Co-supervision of researchers", "Cross-institutional curriculum enrichment"],
    applicationMode: "Rolling Bilateral MoUs / Institutional Invitations"
  },
  {
    id: "student-internships",
    title: "Research Internships & Summer Fellowships",
    icon: "GraduationCap",
    category: "Academic",
    targetAudience: "B.Tech, M.Tech & M.Sc. Students in ECE/EEE/Physics/CSE",
    description: "Hands-on 8-12 week structured research internships covering CST Studio EM simulation, RF PCB fabrication, and AI/ML antenna synthesis.",
    deliverables: ["Conference paper submission", "Hardware prototype fabrication", "Verified internship certificate & letter of recommendation"],
    applicationMode: "Bi-annual cohorts (Summer / Winter cycles)"
  },
  {
    id: "joint-research",
    title: "Joint Research & Publications",
    icon: "BookOpen",
    category: "Research",
    targetAudience: "Research Groups, Doctoral Labs, International PIs",
    description: "Co-investigation into cutting-edge metamaterials, wearable medical telemetry, and satellite macrophyte detection with shared computational & lab resources.",
    deliverables: ["High-impact Q1/Q2 journal articles (IEEE, Elsevier)", "Joint patent filings", "Shared IP frameworks"],
    applicationMode: "Proposal Agreement / Collaborative Research Charter"
  },
  {
    id: "joint-proposals",
    title: "Joint Funded Project Proposals",
    icon: "FileSpreadsheet",
    category: "Research",
    targetAudience: "Principal Investigators, Industry R&D Teams",
    description: "Formulation and submission of multi-institutional competitive grant applications to national and international funding bodies (DST-SERB, CSIR, ISRO-RESPOND, Indo-French CEFIPRA, Indo-Korea NRF).",
    deliverables: ["Comprehensive proposal dossiers", "Sponsored laboratory infrastructure", "Funded JRF/SRF fellowships"],
    applicationMode: "Call-Specific Synchronized Submissions"
  },
  {
    id: "workshops-fdps",
    title: "Workshops, FDPs & Short-Term Training (STTP)",
    icon: "Presentation",
    category: "Capacity Building",
    targetAudience: "Faculty Members, Research Scholars & Practicing Engineers",
    description: "Organizing IEEE-sponsored Faculty Development Programs (FDPs), hands-on EM solver masterclasses, and specialized antenna design workshops.",
    deliverables: ["Course manuals & code repositories", "Certified skill credentials", "Anechoic chamber demonstration"],
    applicationMode: "Institutional Co-Hosting & ATAL / ISTE Endorsements"
  },
  {
    id: "student-projects",
    title: "B.Tech Capstone & M.Tech Thesis Mentorship",
    icon: "Award",
    category: "Academic",
    targetAudience: "Final Year Undergraduate & Postgraduate Engineering Students",
    description: "Co-guidance and industry-aligned problem statements for student capstone projects with clear patentability and commercialization roadmap.",
    deliverables: ["Working hardware prototypes", "National competition entries (Smart India Hackathon, IEEE Awards)", "Thesis dissertation review"],
    applicationMode: "Departmental Approval & Co-Guide Allocation"
  },
  {
    id: "lab-exposure",
    title: "Specialized Laboratory & Testbed Exposure",
    icon: "Microscope",
    category: "Innovation",
    targetAudience: "Collaborating Institutions & Visiting Scholars",
    description: "Access to state-of-the-art Vector Network Analyzers (VNA up to 40 GHz), spectrum analyzers, dielectric probe kits, screen printing setups, and anechoic chamber testing facilities.",
    deliverables: ["Precision S-parameter measurement data", "Radiation pattern polar plots", "Material permittivity/permeability extraction logs"],
    applicationMode: "Facility Booking & Shared Testing Agreements"
  }
];

export const institutionalPartnersData: InstitutionalPartner[] = [
  {
    id: "bits-pilani",
    name: "Birla Institute of Technology and Science (BITS Pilani)",
    location: "Pilani, Rajasthan",
    country: "India",
    category: "Existing Association",
    statusBadge: "Alumnus / Ongoing Academic Linkage",
    logoText: "BITS",
    description: "Alma mater and enduring collaborative relationship in advanced metamaterial electromagnetics, high-frequency characterization, and shared doctoral mentorship.",
    collaborationScopes: [
      "Metamaterial unit cell synthesis and wave-guide verification",
      "Joint paper authorship with faculty and doctoral scholars",
      "Access to central research facility and measurement rigs"
    ],
    keyContacts: "Department of Electrical & Electronics Engineering"
  },
  {
    id: "csir-ceeri",
    name: "CSIR-Central Electronics Engineering Research Institute (CSIR-CEERI)",
    location: "Pilani, Rajasthan",
    country: "India",
    category: "Existing Association",
    statusBadge: "Active Scientific Interaction",
    logoText: "CSIR",
    description: "Premier national laboratory collaboration in microwave tube components, RF sensors, MEMS devices, and electronic systems for societal applications.",
    collaborationScopes: [
      "Joint scientific discussions and conference co-participation",
      "Microwave device testing and cleanroom sensor fabrication guidance",
      "Institutional internship facilitation for advanced students"
    ],
    keyContacts: "Microwave Devices & Smart Sensors Division"
  },
  {
    id: "seoultech",
    name: "Seoul National University of Science and Technology (SeoulTech)",
    location: "Seoul",
    country: "Republic of Korea",
    category: "Existing Association",
    statusBadge: "Post-Doctoral Research Linkage",
    logoText: "SEOUL",
    description: "Long-standing international collaborative bridge established during post-doctoral tenure, focusing on flexible polymer antennas and millimeter-wave wearable arrays.",
    collaborationScopes: [
      "Bi-directional faculty and research scholar interaction",
      "Joint publications in high-tier IEEE journals",
      "Exploration of Indo-Korean bilateral research grants (NRF-DST)"
    ],
    keyContacts: "Dept. of Electrical & Information Engineering"
  },
  {
    id: "iit-bombay",
    name: "Indian Institute of Technology Bombay (IIT Bombay)",
    location: "Mumbai, Maharashtra",
    country: "India",
    category: "Proposed Collaboration",
    statusBadge: "Proposed Research Linkage",
    logoText: "IITB",
    description: "Proposed research synergy in Reconfigurable Intelligent Surfaces (RIS), Sub-THz characterization, and advanced additive manufacturing of conformal RF structures.",
    collaborationScopes: [
      "Proposed joint workshops on 6G smart radio environments",
      "Consultative project formulation for deep-tech microelectronics",
      "Specialized measurement calibration exchanges"
    ],
    keyContacts: "Department of Electrical Engineering"
  },
  {
    id: "univ-poitiers",
    name: "IUT Angoulême / Université de Poitiers",
    location: "Angoulême / Poitiers",
    country: "France",
    category: "Proposed Collaboration",
    statusBadge: "Proposed Bilateral Academic MoA",
    logoText: "UP",
    description: "Proposed international academic exchange in telecommunications, antenna prototyping, and student exchange under European research frameworks.",
    collaborationScopes: [
      "Proposed semester exchange opportunities for postgraduate students",
      "Joint Indo-French seminar series on applied electromagnetics",
      "Exploratory joint proposals under CEFIPRA / Horizon Europe"
    ],
    keyContacts: "Laboratoire XLIM / IUT d'Angoulême"
  },
  {
    id: "mit-adt",
    name: "MIT Art, Design and Technology University (MIT-ADT)",
    location: "Pune, Maharashtra",
    country: "India",
    category: "Potential Collaboration",
    statusBadge: "Potential Academic Collaboration",
    logoText: "MIT",
    description: "Potential interdisciplinary collaboration exploring design-led technology integration, smart agricultural IoT sensors, and circular environmental robotics.",
    collaborationScopes: [
      "Potential interdisciplinary student innovation studios",
      "Workshops on antenna aesthetics and industrial product packaging",
      "Collaborative project pitches for national hackathons"
    ],
    keyContacts: "School of Engineering & Technology"
  }
];

export const representativePublications: PublicationItem[] = [
  {
    id: "pub-01",
    title: "Flexible and Conformable Metamaterial-Inspired Wearable Antenna for Wireless Body Area Networks",
    authors: "Praveen Kumar Sharma, et al.",
    journal: "IEEE Transactions on Antennas and Propagation (TAP)",
    year: 2023,
    doi: "10.1109/TAP.2023.XXXXXXX",
    type: "IEEE Journal / Transactions",
    citations: 38,
    highlight: true
  },
  {
    id: "pub-02",
    title: "A Low-Profile Broadband Reconfigurable Metasurface with Programmable Phase Distribution for 5G Millimeter-Wave Beamsteering",
    authors: "Praveen Kumar Sharma, S. Kim, et al.",
    journal: "IEEE Antennas and Wireless Propagation Letters (AWPL)",
    year: 2022,
    doi: "10.1109/LAWP.2022.XXXXXXX",
    type: "IEEE Journal / Transactions",
    citations: 54,
    highlight: true
  },
  {
    id: "pub-03",
    title: "Design and Experimental Verification of Screen-Printed Flexible Polymer Resonators on Biocompatible Substrates",
    authors: "Praveen Kumar Sharma, et al.",
    journal: "Elsevier Materials Science and Engineering: B",
    year: 2021,
    doi: "10.1016/j.mseb.2021.XXXXXX",
    type: "Elsevier / Springer",
    citations: 42,
    highlight: false
  },
  {
    id: "pub-04",
    title: "Multi-Spectral Satellite Imagery (Sentinel-2) Assisted Bio-Physical Quantification of River Macrophyte Proliferation for Circular Bioenergy",
    authors: "Praveen Kumar Sharma, et al.",
    journal: "Nature Scientific Reports / Environmental Remote Sensing",
    year: 2024,
    doi: "10.1038/s41598-024-XXXXXX",
    type: "Elsevier / Springer",
    citations: 19,
    highlight: true
  },
  {
    id: "pub-05",
    title: "Wearable Metamaterial Antenna System for Continuous Non-Invasive Physiological RF Monitoring",
    authors: "Praveen Kumar Sharma, et al.",
    journal: "Indian Patent Office (Published Patent Application)",
    year: 2023,
    type: "Patent",
    highlight: true
  }
];
