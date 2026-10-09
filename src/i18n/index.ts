import { en, type Dict } from "./en";
import { es } from "./es";
import type { Locale } from "./config";

const dicts: Record<Locale, Dict> = { en, es };
export const getDict = (l: Locale): Dict => dicts[l];
export type { Dict };
