export const site = {
  name: "Rivas Pitching Co.",
  shortName: "Rivas Pitching",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rivaspitching.com",
  phone: "(305) 555-0147",
  phoneHref: "tel:+13055550147",
  email: "danny@rivaspitching.com",
  address: {
    line1: "7800 NW 25th St, Unit 4",
    line2: "Doral, FL 33122",
  },
  instagram: "@rivaspitching",
  founded: 2015,
  coach: "Danny Rivas",
} as const;

export const routes = [
  "",
  "pitching",
  "recruiting",
  "results",
  "parents",
  "about",
  "book",
  "contact",
] as const;
export type RouteKey = (typeof routes)[number];
