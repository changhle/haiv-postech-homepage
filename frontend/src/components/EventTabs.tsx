"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import GradientThumb from "./GradientThumb";
import type { NewsItem, GalleryItem, ImportantDate } from "@/lib/data/events";

export type EventTab = "news" | "gallery" | "dates";

const tabs: { id: EventTab; label: string }[] = [
  { id: "news", label: "News" },
  { id: "gallery", label: "Gallery" },
  { id: "dates", label: "Important Dates" },
];

const dateFmt = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function NewsPanel({ news }: { news: NewsItem[] }) {
  return (
    <ol>
      {news.map((n) => (
        <li
          key={n.title}
          className="flex flex-col gap-1 border-b border-neon/10 py-5 sm:flex-row sm:items-baseline sm:gap-8"
        >
          <time
            dateTime={n.date}
            className="shrink-0 font-mono text-xs tracking-widest text-orchid/80"
          >
            {dateFmt.format(new Date(n.date))}
          </time>
          <div>
            <h3 className="font-medium text-ink">{n.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-mist/70">{n.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function GalleryPanel({ gallery }: { gallery: GalleryItem[] }) {
  return (
    <>
      {/* Touch-friendly carousel on top… */}
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1.15}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        className="pb-10! [--swiper-pagination-color:var(--color-orchid)] [--swiper-pagination-bullet-inactive-color:var(--color-mist)]"
      >
        {gallery.map((g) => (
          <SwiperSlide key={g.title}>
            <figure className="card overflow-hidden">
              <GradientThumb colors={g.colors} className="aspect-[4/3]" />
              <figcaption className="p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display font-semibold">{g.title}</h3>
                  <span className="font-mono text-xs text-mist/70">{g.date}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-mist/70">
                  {g.caption}
                </p>
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* …full grid album below */}
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {gallery.map((g) => (
          <figure key={`grid-${g.title}`} className="group card overflow-hidden">
            <GradientThumb
              colors={g.colors}
              className="aspect-square transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <figcaption className="px-3 py-2.5">
              <span className="block truncate text-xs font-medium">{g.title}</span>
              <span className="font-mono text-[0.65rem] text-mist/70">{g.date}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

function DatesPanel({ importantDates }: { importantDates: ImportantDate[] }) {
  const kindStyle: Record<string, string> = {
    Deadline: "border-royal/50 text-royal",
    "Lab Meeting": "border-mist/40 text-mist",
    Seminar: "border-neon/50 text-orchid",
  };
  return (
    <ol>
      {importantDates.map((d) => (
        <li
          key={`${d.date}-${d.label}`}
          className="flex flex-col gap-2 border-b border-neon/10 py-5 sm:flex-row sm:items-center sm:gap-8"
        >
          <time
            dateTime={d.date}
            className="shrink-0 font-mono text-sm tracking-widest text-ink/90 sm:w-32"
          >
            {dateFmt.format(new Date(d.date))}
          </time>
          <span
            className={`w-fit shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[0.62rem] tracking-wider ${kindStyle[d.kind]}`}
          >
            {d.kind}
          </span>
          <div>
            <p className="font-medium leading-relaxed">{d.label}</p>
            {d.note && <p className="mt-0.5 text-sm text-mist/70">{d.note}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

interface EventTabsProps {
  initialTab?: EventTab;
  news: NewsItem[];
  gallery: GalleryItem[];
  importantDates: ImportantDate[];
}

export default function EventTabs({
  initialTab = "news",
  news,
  gallery,
  importantDates,
}: EventTabsProps) {
  const [tab, setTab] = useState<EventTab>(initialTab);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Event categories"
        className="flex gap-1 border-b border-neon/15"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`relative px-4 py-3 text-sm transition-colors sm:px-5 ${
              tab === t.id ? "text-orchid" : "text-ink/65 hover:text-ink"
            }`}
          >
            {t.label}
            {tab === t.id && (
              <motion.span
                layoutId="event-tab-underline"
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-neon to-orchid"
              />
            )}
          </button>
        ))}
      </div>

      {/* initial=false: the first panel renders visible without an entrance animation */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          role="tabpanel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pt-8"
        >
          {tab === "news" && <NewsPanel news={news} />}
          {tab === "gallery" && <GalleryPanel gallery={gallery} />}
          {tab === "dates" && <DatesPanel importantDates={importantDates} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
