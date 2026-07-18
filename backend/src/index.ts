import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./db.ts";

const app = express();
const PORT = Number(process.env.PORT ?? 8080);

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok" });
  } catch {
    res.status(503).json({ status: "db-unreachable" });
  }
});

/** Members grouped by rank, plus alumni — shaped for the frontend. */
app.get("/api/members", async (_req, res, next) => {
  try {
    const all = await prisma.member.findMany({
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    });
    const labels = {
      PI: "Principal Investigator",
      POSTDOC: "Post-Doc",
      PHD: "Ph.D. Students",
      MS: "M.S. Students",
    } as const;
    const groups = (Object.keys(labels) as (keyof typeof labels)[])
      .map((g) => ({
        label: labels[g],
        members: all
          .filter((m) => !m.graduated && m.memberGroup === g)
          .map((m) => ({
            name: m.name,
            role: m.role,
            interests: m.interests ?? "",
            email: m.email,
            homepage: m.homepage ?? undefined,
            photoUrl: m.photoUrl ?? undefined,
          })),
      }))
      .filter((g) => g.members.length > 0);
    const alumni = all
      .filter((m) => m.graduated)
      .map((m) => ({
        name: m.name,
        degree: m.degree ?? "",
        now: m.currentAffiliation ?? "",
        email: m.email,
      }));
    res.json({ groups, alumni });
  } catch (e) {
    next(e);
  }
});

/** Publications grouped by year (desc): international → domestic → patents. */
app.get("/api/publications", async (_req, res, next) => {
  try {
    const all = await prisma.publication.findMany({
      orderBy: [{ year: "desc" }, { sortOrder: "asc" }, { id: "asc" }],
    });
    const years = [...new Set(all.map((p) => p.year))];
    const grouped = years.map((year) => {
      const inYear = all.filter((p) => p.year === year);
      const paper = (p: (typeof all)[number]) => ({
        tag: p.tag ?? "Conference",
        venue: p.venue ?? "",
        title: p.title,
        authors: p.authors,
        doi: p.doi ?? undefined,
        pdf: p.pdfUrl ?? undefined,
      });
      return {
        year,
        international: inYear.filter((p) => p.category === "INTERNATIONAL").map(paper),
        domestic: inYear.filter((p) => p.category === "DOMESTIC").map(paper),
        patents: inYear
          .filter((p) => p.category === "PATENT")
          .map((p) => ({
            title: p.title,
            inventors: p.authors,
            number: p.patentNumber ?? "",
            date: p.patentDate ?? "",
            status: p.tag === "등록" ? "등록" : "출원",
          })),
      };
    });
    res.json(grouped);
  } catch (e) {
    next(e);
  }
});

/** Events split into the three tabs — shaped for the frontend. */
app.get("/api/events", async (_req, res, next) => {
  try {
    const all = await prisma.event.findMany({ orderBy: { date: "desc" } });
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    const news = all
      .filter((e) => e.category === "NEWS")
      .map((e) => ({ date: iso(e.date), title: e.title, body: e.body ?? "" }));
    const gallery = all
      .filter((e) => e.category === "GALLERY")
      .map((e) => ({
        title: e.title,
        date: iso(e.date).slice(0, 7),
        caption: e.body ?? "",
        imageUrl: e.imageUrl ?? undefined,
        colors: [e.colorA ?? "#9d4edd", e.colorB ?? "#240046"] as [string, string],
      }));
    const importantDates = all
      .filter((e) => e.category === "DATES")
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((e) => ({
        date: iso(e.date),
        label: e.title,
        kind: e.kind ?? "Lab Meeting",
        note: e.note ?? undefined,
      }));
    res.json({ news, gallery, importantDates });
  } catch (e) {
    next(e);
  }
});

app.use(
  (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  },
);

app.listen(PORT, () => {
  console.log(`API server listening on :${PORT}`);
});
