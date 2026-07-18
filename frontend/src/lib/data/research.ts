export interface CoreTopic {
  id: string;
  title: string;
  description: string;
  keywords: string[];
}

/** Accepted-paper counts per target venue, drawn on the Research page chart. */
export interface VenueCount {
  venue: string;
  kind: "Conference" | "Journal";
  count: number;
}

export interface Highlight {
  id: string;
  title: string;
  venue: string;
  year: number;
  summary: string;
  detail: string;
  /** two hex colors for the generated thumbnail gradient */
  thumb: [string, string];
}

export interface Project {
  title: string;
  sponsor: string;
  period: string;
  kind: "국책과제" | "산학협력";
}

export const coreTopics: CoreTopic[] = [
  {
    id: "multimodal",
    title: "Multimodal Learning",
    description:
      "Aligning vision with language and audio so models can describe, retrieve, and reason about what they see in human terms.",
    keywords: ["Vision-Language Models", "Cross-modal Retrieval", "Grounding"],
  },
  {
    id: "video",
    title: "Video Understanding",
    description:
      "Recognizing actions, events, and long-range temporal structure in untrimmed video — from a few seconds to a full day of footage.",
    keywords: ["Action Recognition", "Temporal Grounding", "Egocentric Video"],
  },
  {
    id: "generative",
    title: "Generative Vision Models",
    description:
      "Diffusion and autoregressive models that synthesize and edit images and video under precise, human-friendly control.",
    keywords: ["Diffusion Models", "Controllable Generation", "Video Synthesis"],
  },
  {
    id: "human-ai",
    title: "Human-centered AI",
    description:
      "Making vision systems that people can trust in practice: robust under distribution shift, efficient on-device, and honest about uncertainty.",
    keywords: ["Robustness", "Uncertainty", "Efficient Inference"],
  },
];

export const venueCounts: VenueCount[] = [
  { venue: "CVPR", kind: "Conference", count: 9 },
  { venue: "ICCV", kind: "Conference", count: 6 },
  { venue: "ECCV", kind: "Conference", count: 6 },
  { venue: "NeurIPS", kind: "Conference", count: 4 },
  { venue: "AAAI", kind: "Conference", count: 3 },
  { venue: "TPAMI", kind: "Journal", count: 2 },
  { venue: "IJCV", kind: "Journal", count: 2 },
];

export const highlights: Highlight[] = [
  {
    id: "storyline",
    title: "StoryLine: Narrative-aware Long Video Understanding",
    venue: "CVPR 2026",
    year: 2026,
    summary:
      "A video-language model that follows characters and causal events across hour-long videos.",
    detail:
      "StoryLine builds a persistent memory of entities and events while streaming through long video, letting it answer questions that span an entire film — who did what, why, and what happened as a result. It sets a new state of the art on four long-video QA benchmarks while using 40% less compute than prior streaming approaches.",
    thumb: ["#9d4edd", "#3c096c"],
  },
  {
    id: "dreamedit",
    title: "DreamEdit: Precise Video Editing with Diffusion Guidance",
    venue: "ICCV 2025",
    year: 2025,
    summary:
      "Text-driven video editing that changes only what you ask for and keeps everything else intact.",
    detail:
      "DreamEdit decouples appearance edits from motion by anchoring diffusion guidance to tracked regions, so an edit like “make the jacket red” never bleeds into the background or breaks temporal consistency. Human raters preferred DreamEdit over prior methods in 78% of head-to-head comparisons.",
    thumb: ["#c77dff", "#5a189a"],
  },
  {
    id: "carescreen",
    title: "CareScreen: Uncertainty-aware Medical Image Triage",
    venue: "TPAMI 2025",
    year: 2025,
    summary:
      "A screening model that knows when it doesn't know — and routes those cases to clinicians.",
    detail:
      "Developed with two university hospitals, CareScreen calibrates per-case uncertainty so that automated triage only acts on predictions it can defend, deferring ambiguous studies to radiologists. In a retrospective study of 120k chest radiographs it cut clinician reading load by 34% without missing a single critical finding.",
    thumb: ["#7b2cbf", "#10002b"],
  },
  {
    id: "egoassist",
    title: "EgoAssist: Egocentric Perception for Daily Assistance",
    venue: "ECCV 2024",
    year: 2024,
    summary:
      "First-person vision that anticipates what a wearer is trying to do and what they'll need next.",
    detail:
      "EgoAssist fuses gaze, hand pose, and scene context to forecast a wearer's next action several seconds ahead, enabling assistive AR prompts that arrive before the user asks. The work received an Oral presentation and its benchmark suite has been adopted by three follow-up efforts.",
    thumb: ["#b968f0", "#240046"],
  },
];

export const projects: Project[] = [
  {
    title: "장기 비디오 이해를 위한 서사 구조 학습 원천기술 개발",
    sponsor: "IITP (정보통신기획평가원)",
    period: "2024.04 – 2028.12",
    kind: "국책과제",
  },
  {
    title: "신뢰가능한 의료영상 판독 보조 AI 핵심기술 연구",
    sponsor: "한국연구재단 (NRF) 중견연구",
    period: "2023.03 – 2026.02",
    kind: "국책과제",
  },
  {
    title: "온디바이스 생성형 비전 모델 경량화 공동연구",
    sponsor: "Samsung Electronics",
    period: "2025.01 – 2026.12",
    kind: "산학협력",
  },
  {
    title: "제조 공정 이상탐지 비전 시스템 고도화",
    sponsor: "POSCO Holdings",
    period: "2024.07 – 2025.12",
    kind: "산학협력",
  },
];
