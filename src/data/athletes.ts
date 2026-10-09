export type Level = "D1" | "D2" | "D3" | "NAIA" | "JUCO";

export type Commit = {
  name: string;
  hand: "RHP" | "LHP";
  hs: string;
  grad: number;
  school: string;
  level: Level;
  committed: string; // YYYY-MM
};

export const commits: Commit[] = [
  { name: "Sebastián Oquendo", hand: "RHP", hs: "Belen Jesuit", grad: 2024, school: "Florida International", level: "D1", committed: "2023-09" },
  { name: "Mateo Ferrer", hand: "RHP", hs: "Doral Academy", grad: 2025, school: "Nova Southeastern", level: "D2", committed: "2024-11" },
  { name: "Jayden Baptiste", hand: "LHP", hs: "Miami Southridge", grad: 2023, school: "Miami Dade College", level: "JUCO", committed: "2023-04" },
  { name: "Lucas Herrera", hand: "RHP", hs: "Westminster Christian", grad: 2022, school: "Emory", level: "D3", committed: "2021-11" },
  { name: "Nico Alfonso", hand: "RHP", hs: "Naples", grad: 2024, school: "Stetson", level: "D1", committed: "2023-07" },
  { name: "Adrián Cepeda", hand: "RHP", hs: "Christopher Columbus", grad: 2023, school: "Barry", level: "D2", committed: "2023-02" },
  { name: "Gabriel Toledo", hand: "LHP", hs: "Gulliver Prep", grad: 2025, school: "Florida Gulf Coast", level: "D1", committed: "2024-08" },
  { name: "Isaías Mena", hand: "RHP", hs: "Mater Academy", grad: 2024, school: "Broward College", level: "JUCO", committed: "2024-05" },
  { name: "Kevin Betancourt", hand: "RHP", hs: "Coral Reef", grad: 2023, school: "St. Thomas University", level: "NAIA", committed: "2022-12" },
  { name: "Tomás Vidal", hand: "RHP", hs: "Ransom Everglades", grad: 2025, school: "Tufts", level: "D3", committed: "2024-10" },
  { name: "Alejandro Pino", hand: "LHP", hs: "Hialeah", grad: 2022, school: "Chipola College", level: "JUCO", committed: "2022-03" },
  { name: "Diego Castellanos", hand: "RHP", hs: "Miami Palmetto", grad: 2024, school: "Florida Southern", level: "D2", committed: "2023-10" },
  { name: "Christian Mojica", hand: "RHP", hs: "Braddock", grad: 2023, school: "Palm Beach Atlantic", level: "D2", committed: "2022-11" },
  { name: "Rafael Ulloa", hand: "RHP", hs: "Archbishop McCarthy", grad: 2025, school: "Jacksonville", level: "D1", committed: "2024-06" },
  { name: "Brandon Sosa", hand: "LHP", hs: "Miami Killian", grad: 2022, school: "Keiser", level: "NAIA", committed: "2022-01" },
  { name: "Daniel Arrieta", hand: "RHP", hs: "Felix Varela", grad: 2024, school: "Eckerd", level: "D2", committed: "2023-12" },
  { name: "Marcus Pierre-Louis", hand: "RHP", hs: "Miami Norland", grad: 2023, school: "Bethune-Cookman", level: "D1", committed: "2022-10" },
  { name: "Elián Sardiñas", hand: "RHP", hs: "Monsignor Pace", grad: 2026, school: "Lynn", level: "D2", committed: "2025-09" },
  { name: "Javier Rondón", hand: "LHP", hs: "TERRA", grad: 2025, school: "State College of Florida", level: "JUCO", committed: "2025-02" },
  { name: "Andrés Beltrán", hand: "RHP", hs: "Coral Gables", grad: 2022, school: "Rollins", level: "D2", committed: "2021-10" },
  { name: "Nathan Kessler", hand: "RHP", hs: "Pine Crest", grad: 2024, school: "Washington & Lee", level: "D3", committed: "2023-11" },
  { name: "Owen Fitzgerald", hand: "LHP", hs: "Key West", grad: 2023, school: "Tampa", level: "D2", committed: "2022-09" },
  { name: "Samuel Duarte", hand: "RHP", hs: "Somerset Academy", grad: 2026, school: "Ave Maria", level: "NAIA", committed: "2025-08" },
  { name: "Julián Paredes", hand: "RHP", hs: "Miami Springs", grad: 2024, school: "Hillsborough CC", level: "JUCO", committed: "2024-04" },
  { name: "Emilio Fuster", hand: "RHP", hs: "Belen Jesuit", grad: 2026, school: "Florida Atlantic", level: "D1", committed: "2025-07" },
  { name: "Carlos Aguirre", hand: "LHP", hs: "Doral Academy", grad: 2023, school: "Webber International", level: "NAIA", committed: "2023-03" },
  { name: "Ryan Delgado", hand: "RHP", hs: "Westminster Christian", grad: 2025, school: "Davidson", level: "D1", committed: "2024-09" },
  { name: "Lorenzo Bacallao", hand: "RHP", hs: "Mater Lakes", grad: 2026, school: "Miami Dade College", level: "JUCO", committed: "2025-10" },
];

export const commitTotals = {
  total: 38,
  byLevel: { D1: 9, D2: 12, D3: 4, NAIA: 5, JUCO: 8 } as Record<Level, number>,
};

export type VeloPoint = { date: string; mph: number };

export type CaseStudy = {
  slug: string;
  name: string;
  hand: "RHP" | "LHP";
  hs: string;
  grad: number;
  school: string;
  level: Level;
  program: "in-person" | "remote" | "hybrid";
  before: number;
  after: number;
  months: number;
  points: VeloPoint[];
  photo?: string;
  metrics: { label: { en: string; es: string }; before: string; after: string }[];
  story: { en: string; es: string };
  quote: { en: string; es: string; by: { en: string; es: string } };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sebastian-oquendo",
    name: "Sebastián Oquendo",
    hand: "RHP",
    hs: "Belen Jesuit",
    grad: 2024,
    school: "Florida International",
    level: "D1",
    program: "in-person",
    before: 81,
    after: 90,
    months: 19,
    points: [
      { date: "2022-08", mph: 81 },
      { date: "2022-11", mph: 82 },
      { date: "2023-02", mph: 84 },
      { date: "2023-05", mph: 86 },
      { date: "2023-08", mph: 87 },
      { date: "2023-11", mph: 88 },
      { date: "2024-03", mph: 90 },
    ],
    photo: "/images/college-navy.jpg",
    metrics: [
      { label: { en: "Body weight", es: "Peso corporal" }, before: "168 lb", after: "191 lb" },
      { label: { en: "FB spin", es: "Spin de recta" }, before: "2,050 rpm", after: "2,280 rpm" },
      { label: { en: "Strike %", es: "% strikes" }, before: "58%", after: "66%" },
    ],
    story: {
      en: "Came in the summer before junior year sitting 79–81 with a slider that didn't miss bats. First six months were almost all strength, mobility and a throwing program. Velo didn't move much until month five, then it moved fast. He committed to FIU after a September 2023 bullpen in front of their pitching coach, throwing 88 with a slider that finally had depth.",
      es: "Llegó el verano antes de su tercer año sentado en 79–81 con un slider que no engañaba a nadie. Los primeros seis meses fueron casi todo fuerza, movilidad y un programa de lanzamiento. La velocidad apenas se movió hasta el quinto mes, y después se movió rápido. Se comprometió con FIU tras un bullpen en septiembre de 2023 frente a su coach de pitcheo, tirando 88 con un slider que por fin tenía profundidad.",
    },
    quote: {
      en: "Danny told us in the first meeting it would take a year before anything looked different. He was right almost to the week.",
      es: "Danny nos dijo en la primera reunión que pasaría un año antes de que algo se viera diferente. Acertó casi a la semana.",
      by: { en: "Marisol Oquendo, mother", es: "Marisol Oquendo, mamá" },
    },
  },
  {
    slug: "jayden-baptiste",
    name: "Jayden Baptiste",
    hand: "LHP",
    hs: "Miami Southridge",
    grad: 2023,
    school: "Miami Dade College",
    level: "JUCO",
    program: "in-person",
    before: 78,
    after: 87,
    months: 14,
    points: [
      { date: "2022-01", mph: 78 },
      { date: "2022-04", mph: 80 },
      { date: "2022-07", mph: 82 },
      { date: "2022-10", mph: 84 },
      { date: "2023-01", mph: 86 },
      { date: "2023-03", mph: 87 },
    ],
    photo: "/images/college-green.jpg",
    metrics: [
      { label: { en: "Extension", es: "Extensión" }, before: "5.6 ft", after: "6.2 ft" },
      { label: { en: "Changeup velo diff", es: "Dif. de velo cambio" }, before: "4 mph", after: "9 mph" },
      { label: { en: "Walks / 7 IP", es: "BB / 7 IP" }, before: "5.1", after: "2.4" },
    ],
    story: {
      en: "Lefty with a loose arm and no plan. Was told by two travel coaches he'd need to hit 85 by senior spring or forget about playing in college. We went the JUCO route on purpose: two years of innings at Miami Dade beats a redshirt at a four-year school. He signed with FGCU for 2025 at 89.",
      es: "Zurdo con brazo suelto y sin plan. Dos coaches de travel le dijeron que tenía que llegar a 85 para la primavera de su último año o se olvidara de jugar en la universidad. Fuimos por la ruta JUCO a propósito: dos años de entradas en Miami Dade valen más que un redshirt en una universidad de cuatro años. Firmó con FGCU para 2025 tirando 89.",
    },
    quote: {
      en: "He didn't sell me D1. He told me where I'd actually pitch. That's the only reason I'm still playing.",
      es: "No me vendió D1. Me dijo dónde iba a pitchear de verdad. Es la única razón por la que sigo jugando.",
      by: { en: "Jayden Baptiste", es: "Jayden Baptiste" },
    },
  },
  {
    slug: "mateo-ferrer",
    name: "Mateo Ferrer",
    hand: "RHP",
    hs: "Doral Academy",
    grad: 2025,
    school: "Nova Southeastern",
    level: "D2",
    program: "in-person",
    before: 83,
    after: 89,
    months: 11,
    points: [
      { date: "2023-12", mph: 83 },
      { date: "2024-03", mph: 85 },
      { date: "2024-06", mph: 86 },
      { date: "2024-08", mph: 88 },
      { date: "2024-11", mph: 89 },
    ],
    photo: "/images/college-maroon.jpg",
    metrics: [
      { label: { en: "Slider spin", es: "Spin del slider" }, before: "2,100 rpm", after: "2,450 rpm" },
      { label: { en: "Slider sweep", es: "Sweep del slider" }, before: "4 in", after: "13 in" },
      { label: { en: "Pitches in arsenal", es: "Pitcheos en el arsenal" }, before: "2", after: "4" },
    ],
    story: {
      en: "Already threw hard enough for D2. Problem was one pitch. We spent the spring on pitch design: grip changes on the slider, a kick-change as a third pitch, and a lot of high-speed video. Nova's staff saw him at a July camp and called that week.",
      es: "Ya tiraba suficientemente duro para D2. El problema era que tenía un solo pitcheo. Pasamos la primavera en diseño de pitcheos: cambios de agarre en el slider, un kick-change como tercer pitcheo y mucho video de alta velocidad. El staff de Nova lo vio en un campamento en julio y llamó esa misma semana.",
    },
    quote: {
      en: "We paid for velo. What we got was a second and third pitch, and that's what got him recruited.",
      es: "Pagamos por velocidad. Lo que recibimos fue un segundo y tercer pitcheo, y eso fue lo que lo reclutó.",
      by: { en: "Jorge Ferrer, father", es: "Jorge Ferrer, papá" },
    },
  },
  {
    slug: "lucas-herrera",
    name: "Lucas Herrera",
    hand: "RHP",
    hs: "Westminster Christian",
    grad: 2022,
    school: "Emory",
    level: "D3",
    program: "hybrid",
    before: 79,
    after: 85,
    months: 15,
    points: [
      { date: "2020-08", mph: 79 },
      { date: "2020-12", mph: 80 },
      { date: "2021-04", mph: 82 },
      { date: "2021-08", mph: 84 },
      { date: "2021-11", mph: 85 },
    ],
    metrics: [
      { label: { en: "GPA", es: "GPA" }, before: "4.3", after: "4.3" },
      { label: { en: "Coach emails sent", es: "Correos a coaches" }, before: "0", after: "61" },
      { label: { en: "Campus visits", es: "Visitas a campus" }, before: "0", after: "4" },
    ],
    story: {
      en: "High-academic kid, 85 ceiling, honest about it. The recruiting plan was built around schools where 85 with command plays and the degree matters: Emory, Tufts, W&L, Pomona. Sixty-one emails, four visits, committed in November of senior year.",
      es: "Muchacho de alto rendimiento académico, con techo de 85, y honesto al respecto. El plan de reclutamiento se armó alrededor de universidades donde 85 con comando sí juega y el título importa: Emory, Tufts, W&L, Pomona. Sesenta y un correos, cuatro visitas, comprometido en noviembre de su último año.",
    },
    quote: {
      en: "Nobody else was willing to say 'you're a D3 pitcher, and here's why that's a great outcome.'",
      es: "Nadie más estuvo dispuesto a decir 'eres un pitcher de D3, y esto es por qué es un gran resultado'.",
      by: { en: "Lucas Herrera", es: "Lucas Herrera" },
    },
  },
  {
    slug: "nico-alfonso",
    name: "Nico Alfonso",
    hand: "RHP",
    hs: "Naples",
    grad: 2024,
    school: "Stetson",
    level: "D1",
    program: "remote",
    before: 84,
    after: 91,
    months: 16,
    points: [
      { date: "2022-03", mph: 84 },
      { date: "2022-07", mph: 85 },
      { date: "2022-11", mph: 87 },
      { date: "2023-03", mph: 88 },
      { date: "2023-07", mph: 91 },
    ],
    metrics: [
      { label: { en: "Video reviews", es: "Revisiones de video" }, before: "—", after: "58" },
      { label: { en: "In-person visits", es: "Visitas presenciales" }, before: "—", after: "6" },
      { label: { en: "FB IVB", es: "IVB de recta" }, before: "13 in", after: "17 in" },
    ],
    story: {
      en: "Remote athlete out of Naples, two hours across Alligator Alley. Weekly video review, a throwing program adjusted every two weeks, and a drive to Doral every ten weeks to retest on our equipment. Hit 91 at a July 2023 event and committed to Stetson that month.",
      es: "Atleta remoto desde Naples, a dos horas por Alligator Alley. Revisión de video semanal, un programa de lanzamiento ajustado cada dos semanas y un viaje a Doral cada diez semanas para medir con nuestro equipo. Llegó a 91 en un evento en julio de 2023 y se comprometió con Stetson ese mismo mes.",
    },
    quote: {
      en: "The remote program worked because he never let a week go by without a reply. Sunday night, every Sunday.",
      es: "El programa remoto funcionó porque nunca dejó pasar una semana sin responder. Domingo por la noche, todos los domingos.",
      by: { en: "Ana Alfonso, mother", es: "Ana Alfonso, mamá" },
    },
  },
  {
    slug: "adrian-cepeda",
    name: "Adrián Cepeda",
    hand: "RHP",
    hs: "Christopher Columbus",
    grad: 2023,
    school: "Barry",
    level: "D2",
    program: "in-person",
    before: 0,
    after: 88,
    months: 7,
    points: [
      { date: "2022-06", mph: 0 },
      { date: "2022-08", mph: 60 },
      { date: "2022-09", mph: 72 },
      { date: "2022-10", mph: 80 },
      { date: "2022-12", mph: 85 },
      { date: "2023-01", mph: 88 },
    ],
    metrics: [
      { label: { en: "Weeks no-throw", es: "Semanas sin lanzar" }, before: "8", after: "—" },
      { label: { en: "Return-to-throw phases", es: "Fases de regreso" }, before: "—", after: "6" },
      { label: { en: "Pre-injury velo", es: "Velo antes de la lesión" }, before: "87", after: "88" },
    ],
    story: {
      en: "UCL sprain in May of junior year, treated non-surgically. His doctor cleared him to throw in August; we built a six-phase return-to-throw with the physical therapist and didn't put him on a mound until October. He was back at 88 in January and committed to Barry in February.",
      es: "Esguince del ligamento colateral cubital en mayo de su tercer año, tratado sin cirugía. Su médico lo autorizó a lanzar en agosto; construimos un regreso al lanzamiento en seis fases junto con el fisioterapeuta y no lo subimos al montículo hasta octubre. Volvió a 88 en enero y se comprometió con Barry en febrero.",
    },
    quote: {
      en: "He was slower than we wanted. That's exactly why it worked.",
      es: "Fue más lento de lo que queríamos. Exactamente por eso funcionó.",
      by: { en: "Dr. Elena Cepeda, mother", es: "Dra. Elena Cepeda, mamá" },
    },
  },
];

export const wall = [
  { name: "Elián Sardiñas", meta: "RHP · Monsignor Pace '26 · Lynn", photo: "/images/wall-1.jpg" },
  { name: "Isaías Mena", meta: "RHP · Mater Academy '24 · Broward College", photo: "/images/wall-2.jpg" },
  { name: "Marcus Pierre-Louis", meta: "RHP · Norland '23 · Bethune-Cookman", photo: "/images/wall-3.jpg" },
  { name: "Javier Rondón", meta: "LHP · TERRA '25 · State College of Florida", photo: "/images/wall-4.jpg" },
  { name: "Samuel Duarte", meta: "RHP · Somerset '26 · Ave Maria", photo: "/images/wall-5.jpg" },
  { name: "Owen Fitzgerald", meta: "LHP · Key West '23 · Tampa", photo: "/images/wall-6.jpg" },
];
