/**
 * Dummy seed content — mirrors the frontend's placeholder data modules.
 * Replace with real lab data (or manage rows directly in the DB) later.
 */
import type { $Enums } from "./generated/prisma/client.ts";

type MemberSeed = {
  name: string;
  role: string;
  memberGroup?: $Enums.MemberGroup;
  interests?: string;
  email: string;
  homepage?: string;
  graduated?: boolean;
  degree?: string;
  currentAffiliation?: string;
  sortOrder: number;
};

export const members: MemberSeed[] = [
  {
    name: "Changhee Lee",
    role: "Professor",
    memberGroup: "PI",
    interests: "Computer Vision, Multimodal Learning, Human-centered AI",
    email: "chlee@postech.ac.kr",
    homepage: "https://haiv.postech.ac.kr/~chlee",
    sortOrder: 0,
  },
  {
    name: "Seah Yun",
    role: "Postdoctoral Researcher",
    memberGroup: "POSTDOC",
    interests: "Test-time Adaptation, Robust Vision",
    email: "seah.yun@postech.ac.kr",
    sortOrder: 0,
  },
  {
    name: "Jiwon Kim",
    role: "Ph.D. Candidate",
    memberGroup: "PHD",
    interests: "Long Video Understanding, Video-Language Models",
    email: "jiwon.kim@postech.ac.kr",
    homepage: "https://jiwonkim.github.io",
    sortOrder: 0,
  },
  {
    name: "Seoyeon Park",
    role: "Ph.D. Candidate",
    memberGroup: "PHD",
    interests: "Diffusion Models, Controllable Video Generation",
    email: "sy.park@postech.ac.kr",
    sortOrder: 1,
  },
  {
    name: "Minjun Kang",
    role: "Ph.D. Student",
    memberGroup: "PHD",
    interests: "Uncertainty Estimation, Medical Imaging",
    email: "mj.kang@postech.ac.kr",
    sortOrder: 2,
  },
  {
    name: "Hyunwoo Choi",
    role: "Ph.D. Student",
    memberGroup: "PHD",
    interests: "Egocentric Vision, Efficient Transformers",
    email: "hw.choi@postech.ac.kr",
    sortOrder: 3,
  },
  {
    name: "Dohyun Yoon",
    role: "M.S. Student",
    memberGroup: "MS",
    interests: "Efficient Vision-Language Models",
    email: "dh.yoon@postech.ac.kr",
    sortOrder: 0,
  },
  {
    name: "Yerin Jang",
    role: "M.S. Student",
    memberGroup: "MS",
    interests: "Video Editing, Generative Models",
    email: "yr.jang@postech.ac.kr",
    sortOrder: 1,
  },
  {
    name: "Junho Seo",
    role: "M.S. Student",
    memberGroup: "MS",
    interests: "Anomaly Detection, Industrial Vision",
    email: "jh.seo@postech.ac.kr",
    sortOrder: 2,
  },
  // Alumni
  {
    name: "Sunwoo Baek",
    role: "Alumni",
    graduated: true,
    degree: "Ph.D. (2025)",
    currentAffiliation: "Research Scientist, Samsung Advanced Institute of Technology",
    email: "sunwoo.baek@alumni.postech.ac.kr",
    sortOrder: 0,
  },
  {
    name: "Hana Moon",
    role: "Alumni",
    graduated: true,
    degree: "M.S. (2025)",
    currentAffiliation: "ML Engineer, Naver Cloud",
    email: "hana.moon@alumni.postech.ac.kr",
    sortOrder: 1,
  },
  {
    name: "Taeyang Kwon",
    role: "Alumni",
    graduated: true,
    degree: "M.S. (2024)",
    currentAffiliation: "Ph.D. Student, KAIST",
    email: "ty.kwon@alumni.postech.ac.kr",
    sortOrder: 2,
  },
  {
    name: "Eunji Cho",
    role: "Alumni",
    graduated: true,
    degree: "Ph.D. (2023)",
    currentAffiliation: "Assistant Professor, Kyungpook National University",
    email: "eunji.cho@alumni.postech.ac.kr",
    sortOrder: 3,
  },
  {
    name: "Minseok Han",
    role: "Alumni",
    graduated: true,
    degree: "M.S. (2023)",
    currentAffiliation: "Software Engineer, Kakao",
    email: "ms.han@alumni.postech.ac.kr",
    sortOrder: 4,
  },
];

type PublicationSeed = {
  year: number;
  category: $Enums.PublicationCategory;
  tag?: string;
  venue?: string;
  title: string;
  authors: string;
  doi?: string;
  pdfUrl?: string;
  patentNumber?: string;
  patentDate?: string;
  sortOrder: number;
};

export const publications: PublicationSeed[] = [
  // 2026 — international
  {
    year: 2026,
    category: "INTERNATIONAL",
    tag: "Conference",
    venue: "CVPR 2026",
    title: "StoryLine: Narrative-aware Long Video Understanding",
    authors: "J. Kim, S. Park, H. Choi, C. Lee",
    doi: "https://doi.org/10.0000/cvpr.2026.0001",
    pdfUrl: "#",
    sortOrder: 0,
  },
  {
    year: 2026,
    category: "INTERNATIONAL",
    tag: "Conference",
    venue: "CVPR 2026",
    title: "Sparse Memory Distillation for Streaming Video Transformers",
    authors: "H. Choi, M. Kang, C. Lee",
    doi: "https://doi.org/10.0000/cvpr.2026.0002",
    pdfUrl: "#",
    sortOrder: 1,
  },
  {
    year: 2026,
    category: "INTERNATIONAL",
    tag: "Journal",
    venue: "IJCV",
    title: "A Survey of Human-centered Evaluation for Generative Vision Models",
    authors: "S. Park, J. Kim, C. Lee",
    doi: "https://doi.org/10.0000/ijcv.2026.0003",
    sortOrder: 2,
  },
  // 2026 — domestic
  {
    year: 2026,
    category: "DOMESTIC",
    tag: "Conference",
    venue: "한국컴퓨터비전학회 동계학술대회 (KCCV Winter)",
    title: "장기 비디오 질의응답을 위한 인물 중심 메모리 구조",
    authors: "김지원, 박서연, 이창희",
    pdfUrl: "#",
    sortOrder: 0,
  },
  // 2026 — patents
  {
    year: 2026,
    category: "PATENT",
    tag: "출원",
    title: "스트리밍 비디오 요약을 위한 엔티티 메모리 관리 방법 및 장치",
    authors: "이창희, 김지원",
    patentNumber: "10-2026-0012345",
    patentDate: "2026.02.11",
    sortOrder: 0,
  },
  // 2025 — international
  {
    year: 2025,
    category: "INTERNATIONAL",
    tag: "Conference",
    venue: "ICCV 2025",
    title: "DreamEdit: Precise Video Editing with Diffusion Guidance",
    authors: "S. Park, D. Yoon, C. Lee",
    doi: "https://doi.org/10.0000/iccv.2025.0104",
    pdfUrl: "#",
    sortOrder: 0,
  },
  {
    year: 2025,
    category: "INTERNATIONAL",
    tag: "Conference",
    venue: "NeurIPS 2025",
    title: "Calibrated Deferral Policies for Vision-based Triage",
    authors: "M. Kang, J. Kim, C. Lee",
    doi: "https://doi.org/10.0000/neurips.2025.0442",
    pdfUrl: "#",
    sortOrder: 1,
  },
  {
    year: 2025,
    category: "INTERNATIONAL",
    tag: "Journal",
    venue: "IEEE TPAMI",
    title: "CareScreen: Uncertainty-aware Medical Image Triage at Scale",
    authors: "M. Kang, H. Choi, S. Yun, C. Lee",
    doi: "https://doi.org/10.0000/tpami.2025.0021",
    pdfUrl: "#",
    sortOrder: 2,
  },
  {
    year: 2025,
    category: "INTERNATIONAL",
    tag: "Conference",
    venue: "AAAI 2025",
    title: "Token Merging with Semantic Anchors for Efficient VLMs",
    authors: "D. Yoon, H. Choi, C. Lee",
    doi: "https://doi.org/10.0000/aaai.2025.0870",
    pdfUrl: "#",
    sortOrder: 3,
  },
  // 2025 — domestic
  {
    year: 2025,
    category: "DOMESTIC",
    tag: "Journal",
    venue: "정보과학회논문지",
    title: "불확실성 기반 의료영상 분류 유보 정책의 임상 적용 연구",
    authors: "강민준, 이창희",
    doi: "https://doi.org/10.0000/kiise.2025.0033",
    pdfUrl: "#",
    sortOrder: 0,
  },
  {
    year: 2025,
    category: "DOMESTIC",
    tag: "Conference",
    venue: "대한전자공학회 하계학술대회 (IEIE Summer)",
    title: "온디바이스 확산 모델을 위한 단계 축약 지식 증류",
    authors: "윤도현, 박서연, 이창희",
    pdfUrl: "#",
    sortOrder: 1,
  },
  // 2025 — patents
  {
    year: 2025,
    category: "PATENT",
    tag: "출원",
    title: "확산 모델 기반 국소 영역 비디오 편집 방법",
    authors: "박서연, 이창희",
    patentNumber: "10-2025-0098765",
    patentDate: "2025.08.29",
    sortOrder: 0,
  },
  {
    year: 2025,
    category: "PATENT",
    tag: "등록",
    title: "불확실성 추정을 이용한 의료영상 자동 판독 유보 시스템",
    authors: "강민준, 이창희",
    patentNumber: "10-2687654",
    patentDate: "2025.03.14",
    sortOrder: 1,
  },
  // 2024 — international
  {
    year: 2024,
    category: "INTERNATIONAL",
    tag: "Conference",
    venue: "ECCV 2024 (Oral)",
    title: "EgoAssist: Egocentric Perception for Daily Assistance",
    authors: "H. Choi, S. Yun, C. Lee",
    doi: "https://doi.org/10.0000/eccv.2024.0310",
    pdfUrl: "#",
    sortOrder: 0,
  },
  {
    year: 2024,
    category: "INTERNATIONAL",
    tag: "Conference",
    venue: "CVPR 2024",
    title: "Test-time Adaptation with Confidence-gated Pseudo Labels",
    authors: "S. Yun, M. Kang, C. Lee",
    doi: "https://doi.org/10.0000/cvpr.2024.0177",
    pdfUrl: "#",
    sortOrder: 1,
  },
  {
    year: 2024,
    category: "INTERNATIONAL",
    tag: "Journal",
    venue: "IEEE TPAMI",
    title: "Temporal Grounding in Untrimmed Video: A Unified Benchmark",
    authors: "J. Kim, H. Choi, C. Lee",
    doi: "https://doi.org/10.0000/tpami.2024.0058",
    pdfUrl: "#",
    sortOrder: 2,
  },
  // 2024 — domestic
  {
    year: 2024,
    category: "DOMESTIC",
    tag: "Conference",
    venue: "한국정보과학회 KCC 2024",
    title: "일인칭 시점 행동 예측을 위한 시선-손 동작 융합 모델",
    authors: "최현우, 윤세아, 이창희",
    pdfUrl: "#",
    sortOrder: 0,
  },
  // 2024 — patents
  {
    year: 2024,
    category: "PATENT",
    tag: "등록",
    title: "일인칭 영상 기반 사용자 의도 예측 장치 및 방법",
    authors: "최현우, 이창희",
    patentNumber: "10-2598321",
    patentDate: "2024.11.02",
    sortOrder: 0,
  },
];

type EventSeed = {
  category: $Enums.EventCategory;
  title: string;
  body?: string;
  date: string; // ISO
  kind?: string;
  note?: string;
  colorA?: string;
  colorB?: string;
};

export const events: EventSeed[] = [
  // News
  {
    category: "NEWS",
    date: "2026-06-19",
    title: "StoryLine wins Best Paper Honorable Mention at CVPR 2026",
    body: "Our narrative-aware long video model was recognized among the top submissions out of 12,000+ papers.",
  },
  {
    category: "NEWS",
    date: "2026-05-02",
    title: "New IITP grant on long-form video understanding",
    body: "HAIV Lab will lead a five-year national project on narrative structure learning for hour-scale video.",
  },
  {
    category: "NEWS",
    date: "2026-03-27",
    title: "Two papers accepted to CVPR 2026",
    body: "StoryLine and Sparse Memory Distillation were both accepted — congratulations to Jiwon and Hyunwoo!",
  },
  {
    category: "NEWS",
    date: "2025-12-15",
    title: "CareScreen featured in MIT Technology Review",
    body: "Our uncertainty-aware triage work was covered as an example of AI that knows its own limits in clinical practice.",
  },
  {
    category: "NEWS",
    date: "2025-10-04",
    title: "DreamEdit presented at ICCV 2025 in Honolulu",
    body: "Seoyeon presented our controllable video editing work; the demo drew one of the longest lines at the poster session.",
  },
  {
    category: "NEWS",
    date: "2025-09-01",
    title: "Welcome new members!",
    body: "Dohyun, Yerin, and Junho join HAIV Lab as M.S. students this fall. Welcome aboard!",
  },
  // Gallery
  {
    category: "GALLERY",
    date: "2026-06-01",
    title: "CVPR 2026",
    body: "Team dinner after the award session in Seattle",
    colorA: "#9d4edd",
    colorB: "#240046",
  },
  {
    category: "GALLERY",
    date: "2026-04-01",
    title: "Spring Retreat",
    body: "Annual lab workshop at Gyeongju — research talks and bike rides",
    colorA: "#c77dff",
    colorB: "#3c096c",
  },
  {
    category: "GALLERY",
    date: "2025-10-01",
    title: "ICCV 2025",
    body: "DreamEdit live demo at the Honolulu poster hall",
    colorA: "#7b2cbf",
    colorB: "#10002b",
  },
  {
    category: "GALLERY",
    date: "2025-08-01",
    title: "Graduation Day",
    body: "Congratulations Dr. Baek and Hana on your graduation!",
    colorA: "#b968f0",
    colorB: "#240046",
  },
  {
    category: "GALLERY",
    date: "2025-07-01",
    title: "Summer BBQ",
    body: "Lab barbecue by the Hyeongsan river",
    colorA: "#e0aaff",
    colorB: "#5a189a",
  },
  {
    category: "GALLERY",
    date: "2025-05-01",
    title: "Hospital Fieldwork",
    body: "CareScreen deployment visit with our clinical collaborators",
    colorA: "#9d4edd",
    colorB: "#3c096c",
  },
  {
    category: "GALLERY",
    date: "2025-02-01",
    title: "KCCV 2025",
    body: "Four posters and one oral at the winter meeting in Pyeongchang",
    colorA: "#c77dff",
    colorB: "#240046",
  },
  {
    category: "GALLERY",
    date: "2024-11-01",
    title: "Lab Anniversary",
    body: "Five years of HAIV Lab — cake, retrospectives, and bold predictions",
    colorA: "#7b2cbf",
    colorB: "#5a189a",
  },
  // Important dates
  {
    category: "DATES",
    date: "2026-07-24",
    title: "Weekly lab meeting — progress reports",
    kind: "Lab Meeting",
    note: "Fridays 10:00, Room 208",
  },
  {
    category: "DATES",
    date: "2026-08-08",
    title: "AAAI 2027 abstract deadline",
    kind: "Deadline",
  },
  {
    category: "DATES",
    date: "2026-08-15",
    title: "AAAI 2027 full paper deadline",
    kind: "Deadline",
  },
  {
    category: "DATES",
    date: "2026-09-11",
    title: "Invited seminar — Prof. Mina Oh (SNU), “Video Foundation Models”",
    kind: "Seminar",
    note: "14:00, Engineering Bldg 2 Auditorium",
  },
  {
    category: "DATES",
    date: "2026-11-14",
    title: "CVPR 2027 paper deadline",
    kind: "Deadline",
  },
  {
    category: "DATES",
    date: "2026-12-18",
    title: "Winter research retreat — year-end reviews",
    kind: "Lab Meeting",
    note: "Full day, venue TBA",
  },
];
