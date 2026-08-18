import type { ExperienceEntry } from "./types";

/** Employment, most recent first. */
export const experience: ExperienceEntry[] = [
  {
    org: "Walnut Insurance",
    role: "AI Automation Engineer",
    employment: "Contract",
    period: "Apr 2026 to Present",
    location: "Toronto, Ontario, Canada · Remote",
    points: [
      "Designed and built an end-to-end automated outbound sales pipeline as the sole engineer, integrating the Apollo, HubSpot, OpenAI and Microsoft Graph APIs.",
      "Built an LLM-based lead qualification system with tiered classification logic, iterating on prompt design with stakeholders against real production data.",
      "Integrated CRM, email and messaging systems with deduplication, audit logging and scheduled automation across HubSpot, Outlook, Slack and Google Sheets.",
      "Coordinated across executive, product and IT stakeholders to scope requirements, resolve technical blockers and deploy into a SOC 2-restricted production environment.",
    ],
  },
  {
    org: "GenesisX",
    role: "AI / LLM Tooling Intern",
    employment: "Internship",
    period: "May 2025 to Apr 2026",
    location: "Minneapolis, Minnesota · Remote",
    points: [
      "Automated Google Ads reporting workflows, extracting demographic and campaign keyword data into Google Sheets for visualisation.",
      "Created AI-driven video and content assets with Runway and MidJourney to support marketing campaigns and commercial projects.",
      "Worked with marketing and technical teams to streamline workflows and improve creative output.",
    ],
  },
  {
    org: "Target",
    role: "Food and Beverage Expert",
    employment: "Part-time",
    period: "Oct 2023 to Aug 2024",
    location: "Lakeville, Minnesota · On-site",
    // TODO(content): add a line or two about what this involved if you want it
    // to carry more weight; it renders fine without any.
    points: [],
  },
  {
    org: "Lake Marion Collision Center",
    role: "Technology Specialist",
    employment: "Part-time",
    period: "Jun 2021 to Aug 2021",
    location: "Lakeville, Minnesota · On-site",
    // TODO(content): same here.
    points: [],
  },
];

/** Self-directed work, shown alongside the employment timeline. */
export const independentWork: ExperienceEntry[] = [
  {
    org: "Independent builds",
    role: "Full-stack & systems work",
    period: "2023 to Present",
    points: [
      "Shipped eleven independent systems spanning full-stack web, native iOS, published game content and quantitative research.",
      "Built production-shaped infrastructure end to end: Postgres schemas, scheduled ingestion, Docker Compose stacks, CI and alerting.",
      "Wrote the test suites to match: 562 tests on the quant platform, 222 plus end-to-end coverage on ScentScout.",
      "Treated safety as a design constraint: manual promotion gates, fail-closed admin checks and kill switches on anything that could touch money.",
    ],
  },
];

export const education: ExperienceEntry[] = [
  {
    org: "University of Minnesota",
    role: "B.S. Computer Science",
    period: "Sep 2024 to May 2028",
    location: "College of Science and Engineering",
    points: ["GPA 3.26 / 4.00"],
  },
  {
    org: "Lakeville South High School",
    role: "High School Diploma",
    period: "Sep 2020 to Jun 2024",
    location: "Lakeville, Minnesota",
    points: [],
  },
];

/** Writing and other published work. */
export const publications: ExperienceEntry[] = [
  {
    org: "Both.org",
    role: "Generative AI and Student Learning: Ethical and Cognitive Impacts",
    period: "Nov 19, 2024",
    location: "University of Minnesota, WRIT 1301",
    points: [
      "Interviewed a UMN professor on generative AI's influence on higher education and authored a published article on its impact on student learning and educational policy.",
    ],
  },
];
