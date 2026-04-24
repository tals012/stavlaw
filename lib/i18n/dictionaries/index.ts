import type { LocaleCode } from "../config";
import type { Dictionary } from "../types";
import { he } from "./he";
import { en } from "./en";
import { ru } from "./ru";
import { ar } from "./ar";

export const DICTIONARIES: Record<LocaleCode, Dictionary> = { he, en, ru, ar };
