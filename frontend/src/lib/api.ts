/**
 * Backend API client with graceful fallback.
 *
 * When API_URL (or NEXT_PUBLIC_API_URL) is set — as in docker-compose — pages
 * fetch live data from the Express backend and revalidate every 60s (ISR).
 * When it is unset or unreachable (e.g. `npm run dev` without the backend),
 * the bundled dummy data modules are served instead, so the frontend always
 * works standalone.
 */
import {
  memberGroups as fallbackGroups,
  alumni as fallbackAlumni,
  type Member,
  type MemberGroup,
  type Alum,
} from "@/lib/data/members";
import { publications as fallbackPubs, type YearGroup } from "@/lib/data/publications";
import {
  news as fallbackNews,
  gallery as fallbackGallery,
  importantDates as fallbackDates,
  type NewsItem,
  type GalleryItem,
  type ImportantDate,
} from "@/lib/data/events";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

async function fetchJson<T>(path: string): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Deterministic purple gradient per member, until real photos exist. */
const AVATAR_PAIRS: [string, string][] = [
  ["#9d4edd", "#3c096c"],
  ["#c77dff", "#5a189a"],
  ["#7b2cbf", "#240046"],
  ["#b968f0", "#3c096c"],
  ["#e0aaff", "#5a189a"],
];
function avatarFor(name: string): [string, string] {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.codePointAt(0)!) >>> 0;
  return AVATAR_PAIRS[h % AVATAR_PAIRS.length];
}

interface ApiMembers {
  groups: {
    label: string;
    members: Omit<Member, "avatar">[];
  }[];
  alumni: Alum[];
}

export async function getMembers(): Promise<{ groups: MemberGroup[]; alumni: Alum[] }> {
  const data = await fetchJson<ApiMembers>("/members");
  if (!data) return { groups: fallbackGroups, alumni: fallbackAlumni };
  return {
    groups: data.groups.map((g) => ({
      label: g.label,
      members: g.members.map((m) => ({ ...m, avatar: avatarFor(m.name) })),
    })),
    alumni: data.alumni,
  };
}

export async function getPublications(): Promise<YearGroup[]> {
  const data = await fetchJson<YearGroup[]>("/publications");
  return data ?? fallbackPubs;
}

export interface EventsPayload {
  news: NewsItem[];
  gallery: GalleryItem[];
  importantDates: ImportantDate[];
}

export async function getEvents(): Promise<EventsPayload> {
  const data = await fetchJson<EventsPayload>("/events");
  return (
    data ?? {
      news: fallbackNews,
      gallery: fallbackGallery,
      importantDates: fallbackDates,
    }
  );
}
