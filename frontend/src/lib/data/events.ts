export interface NewsItem {
  date: string; // ISO yyyy-mm-dd
  title: string;
  body: string;
}

export interface GalleryItem {
  title: string;
  date: string;
  caption: string;
  /** two hex colors for the generated placeholder image */
  colors: [string, string];
}

export interface ImportantDate {
  date: string;
  label: string;
  kind: "Deadline" | "Lab Meeting" | "Seminar";
  note?: string;
}

export const news: NewsItem[] = [
  {
    date: "2026-06-19",
    title: "StoryLine wins Best Paper Honorable Mention at CVPR 2026",
    body: "Our narrative-aware long video model was recognized among the top submissions out of 12,000+ papers.",
  },
  {
    date: "2026-05-02",
    title: "New IITP grant on long-form video understanding",
    body: "HAIV Lab will lead a five-year national project on narrative structure learning for hour-scale video.",
  },
  {
    date: "2026-03-27",
    title: "Two papers accepted to CVPR 2026",
    body: "StoryLine and Sparse Memory Distillation were both accepted — congratulations to Jiwon and Hyunwoo!",
  },
  {
    date: "2025-12-15",
    title: "CareScreen featured in MIT Technology Review",
    body: "Our uncertainty-aware triage work was covered as an example of AI that knows its own limits in clinical practice.",
  },
  {
    date: "2025-10-04",
    title: "DreamEdit presented at ICCV 2025 in Honolulu",
    body: "Seoyeon presented our controllable video editing work; the demo drew one of the longest lines at the poster session.",
  },
  {
    date: "2025-09-01",
    title: "Welcome new members!",
    body: "Dohyun, Yerin, and Junho join HAIV Lab as M.S. students this fall. Welcome aboard!",
  },
];

export const gallery: GalleryItem[] = [
  {
    title: "CVPR 2026",
    date: "2026-06",
    caption: "Team dinner after the award session in Seattle",
    colors: ["#9d4edd", "#240046"],
  },
  {
    title: "Spring Retreat",
    date: "2026-04",
    caption: "Annual lab workshop at Gyeongju — research talks and bike rides",
    colors: ["#c77dff", "#3c096c"],
  },
  {
    title: "ICCV 2025",
    date: "2025-10",
    caption: "DreamEdit live demo at the Honolulu poster hall",
    colors: ["#7b2cbf", "#10002b"],
  },
  {
    title: "Graduation Day",
    date: "2025-08",
    caption: "Congratulations Dr. Baek and Hana on your graduation!",
    colors: ["#b968f0", "#240046"],
  },
  {
    title: "Summer BBQ",
    date: "2025-07",
    caption: "Lab barbecue by the Hyeongsan river",
    colors: ["#e0aaff", "#5a189a"],
  },
  {
    title: "Hospital Fieldwork",
    date: "2025-05",
    caption: "CareScreen deployment visit with our clinical collaborators",
    colors: ["#9d4edd", "#3c096c"],
  },
  {
    title: "KCCV 2025",
    date: "2025-02",
    caption: "Four posters and one oral at the winter meeting in Pyeongchang",
    colors: ["#c77dff", "#240046"],
  },
  {
    title: "Lab Anniversary",
    date: "2024-11",
    caption: "Five years of HAIV Lab — cake, retrospectives, and bold predictions",
    colors: ["#7b2cbf", "#5a189a"],
  },
];

export const importantDates: ImportantDate[] = [
  {
    date: "2026-07-24",
    label: "Weekly lab meeting — progress reports",
    kind: "Lab Meeting",
    note: "Fridays 10:00, Room 208",
  },
  {
    date: "2026-08-08",
    label: "AAAI 2027 abstract deadline",
    kind: "Deadline",
  },
  {
    date: "2026-08-15",
    label: "AAAI 2027 full paper deadline",
    kind: "Deadline",
  },
  {
    date: "2026-09-11",
    label: "Invited seminar — Prof. Mina Oh (SNU), “Video Foundation Models”",
    kind: "Seminar",
    note: "14:00, Engineering Bldg 2 Auditorium",
  },
  {
    date: "2026-11-14",
    label: "CVPR 2027 paper deadline",
    kind: "Deadline",
  },
  {
    date: "2026-12-18",
    label: "Winter research retreat — year-end reviews",
    kind: "Lab Meeting",
    note: "Full day, venue TBA",
  },
];
