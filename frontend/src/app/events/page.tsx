import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import EventTabs, { type EventTab } from "@/components/EventTabs";
import { getEvents } from "@/lib/api";

export const metadata: Metadata = {
  title: "Events",
  description: "News, photo gallery, and important dates from HAIV Lab.",
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const initialTab: EventTab =
    tab === "gallery" || tab === "dates" ? tab : "news";
  const { news, gallery, importantDates } = await getEvents();

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 pb-8">
      <Reveal>
        <SectionHeading
          eyebrow="Events"
          title="Life at the lab"
          lede="What we've achieved, where we've been, and what's coming up."
        />
      </Reveal>
      <Reveal delay={0.1}>
        <EventTabs
          initialTab={initialTab}
          news={news}
          gallery={gallery}
          importantDates={importantDates}
        />
      </Reveal>
    </div>
  );
}
