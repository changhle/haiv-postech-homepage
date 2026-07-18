export interface Paper {
  tag: "Journal" | "Conference";
  venue: string;
  title: string;
  authors: string;
  doi?: string;
  pdf?: string;
}

export interface Patent {
  title: string;
  inventors: string;
  number: string;
  date: string;
  status: "출원" | "등록";
}

export interface YearGroup {
  year: number;
  international: Paper[];
  domestic: Paper[];
  patents: Patent[];
}

/** Sorted newest-first; the Publications page renders in array order. */
export const publications: YearGroup[] = [
  {
    year: 2026,
    international: [
      {
        tag: "Conference",
        venue: "CVPR 2026",
        title: "StoryLine: Narrative-aware Long Video Understanding",
        authors: "J. Kim, S. Park, H. Choi, C. Lee",
        doi: "https://doi.org/10.0000/cvpr.2026.0001",
        pdf: "#",
      },
      {
        tag: "Conference",
        venue: "CVPR 2026",
        title: "Sparse Memory Distillation for Streaming Video Transformers",
        authors: "H. Choi, M. Kang, C. Lee",
        doi: "https://doi.org/10.0000/cvpr.2026.0002",
        pdf: "#",
      },
      {
        tag: "Journal",
        venue: "IJCV",
        title: "A Survey of Human-centered Evaluation for Generative Vision Models",
        authors: "S. Park, J. Kim, C. Lee",
        doi: "https://doi.org/10.0000/ijcv.2026.0003",
      },
    ],
    domestic: [
      {
        tag: "Conference",
        venue: "한국컴퓨터비전학회 동계학술대회 (KCCV Winter)",
        title: "장기 비디오 질의응답을 위한 인물 중심 메모리 구조",
        authors: "김지원, 박서연, 이창희",
        pdf: "#",
      },
    ],
    patents: [
      {
        title: "스트리밍 비디오 요약을 위한 엔티티 메모리 관리 방법 및 장치",
        inventors: "이창희, 김지원",
        number: "10-2026-0012345",
        date: "2026.02.11",
        status: "출원",
      },
    ],
  },
  {
    year: 2025,
    international: [
      {
        tag: "Conference",
        venue: "ICCV 2025",
        title: "DreamEdit: Precise Video Editing with Diffusion Guidance",
        authors: "S. Park, D. Yoon, C. Lee",
        doi: "https://doi.org/10.0000/iccv.2025.0104",
        pdf: "#",
      },
      {
        tag: "Conference",
        venue: "NeurIPS 2025",
        title: "Calibrated Deferral Policies for Vision-based Triage",
        authors: "M. Kang, J. Kim, C. Lee",
        doi: "https://doi.org/10.0000/neurips.2025.0442",
        pdf: "#",
      },
      {
        tag: "Journal",
        venue: "IEEE TPAMI",
        title: "CareScreen: Uncertainty-aware Medical Image Triage at Scale",
        authors: "M. Kang, H. Choi, S. Yun, C. Lee",
        doi: "https://doi.org/10.0000/tpami.2025.0021",
        pdf: "#",
      },
      {
        tag: "Conference",
        venue: "AAAI 2025",
        title: "Token Merging with Semantic Anchors for Efficient VLMs",
        authors: "D. Yoon, H. Choi, C. Lee",
        doi: "https://doi.org/10.0000/aaai.2025.0870",
        pdf: "#",
      },
    ],
    domestic: [
      {
        tag: "Journal",
        venue: "정보과학회논문지",
        title: "불확실성 기반 의료영상 분류 유보 정책의 임상 적용 연구",
        authors: "강민준, 이창희",
        doi: "https://doi.org/10.0000/kiise.2025.0033",
        pdf: "#",
      },
      {
        tag: "Conference",
        venue: "대한전자공학회 하계학술대회 (IEIE Summer)",
        title: "온디바이스 확산 모델을 위한 단계 축약 지식 증류",
        authors: "윤도현, 박서연, 이창희",
        pdf: "#",
      },
    ],
    patents: [
      {
        title: "확산 모델 기반 국소 영역 비디오 편집 방법",
        inventors: "박서연, 이창희",
        number: "10-2025-0098765",
        date: "2025.08.29",
        status: "출원",
      },
      {
        title: "불확실성 추정을 이용한 의료영상 자동 판독 유보 시스템",
        inventors: "강민준, 이창희",
        number: "10-2687654",
        date: "2025.03.14",
        status: "등록",
      },
    ],
  },
  {
    year: 2024,
    international: [
      {
        tag: "Conference",
        venue: "ECCV 2024 (Oral)",
        title: "EgoAssist: Egocentric Perception for Daily Assistance",
        authors: "H. Choi, S. Yun, C. Lee",
        doi: "https://doi.org/10.0000/eccv.2024.0310",
        pdf: "#",
      },
      {
        tag: "Conference",
        venue: "CVPR 2024",
        title: "Test-time Adaptation with Confidence-gated Pseudo Labels",
        authors: "S. Yun, M. Kang, C. Lee",
        doi: "https://doi.org/10.0000/cvpr.2024.0177",
        pdf: "#",
      },
      {
        tag: "Journal",
        venue: "IEEE TPAMI",
        title: "Temporal Grounding in Untrimmed Video: A Unified Benchmark",
        authors: "J. Kim, H. Choi, C. Lee",
        doi: "https://doi.org/10.0000/tpami.2024.0058",
        pdf: "#",
      },
    ],
    domestic: [
      {
        tag: "Conference",
        venue: "한국정보과학회 KCC 2024",
        title: "일인칭 시점 행동 예측을 위한 시선-손 동작 융합 모델",
        authors: "최현우, 윤세아, 이창희",
        pdf: "#",
      },
    ],
    patents: [
      {
        title: "일인칭 영상 기반 사용자 의도 예측 장치 및 방법",
        inventors: "최현우, 이창희",
        number: "10-2598321",
        date: "2024.11.02",
        status: "등록",
      },
    ],
  },
];
