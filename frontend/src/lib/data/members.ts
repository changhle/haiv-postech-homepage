export interface Member {
  name: string;
  role: string;
  interests: string;
  email: string;
  homepage?: string;
  /** two hex colors for the generated avatar gradient */
  avatar: [string, string];
}

export interface MemberGroup {
  label: string;
  members: Member[];
}

export interface Alum {
  name: string;
  degree: string;
  now: string;
  email: string;
}

export const memberGroups: MemberGroup[] = [
  {
    label: "Principal Investigator",
    members: [
      {
        name: "Changhee Lee",
        role: "Professor",
        interests: "Computer Vision, Multimodal Learning, Human-centered AI",
        email: "chlee@postech.ac.kr",
        homepage: "https://haiv.postech.ac.kr/~chlee",
        avatar: ["#9d4edd", "#3c096c"],
      },
    ],
  },
  {
    label: "Post-Doc",
    members: [
      {
        name: "Seah Yun",
        role: "Postdoctoral Researcher",
        interests: "Test-time Adaptation, Robust Vision",
        email: "seah.yun@postech.ac.kr",
        avatar: ["#c77dff", "#5a189a"],
      },
    ],
  },
  {
    label: "Ph.D. Students",
    members: [
      {
        name: "Jiwon Kim",
        role: "Ph.D. Candidate",
        interests: "Long Video Understanding, Video-Language Models",
        email: "jiwon.kim@postech.ac.kr",
        homepage: "https://jiwonkim.github.io",
        avatar: ["#7b2cbf", "#240046"],
      },
      {
        name: "Seoyeon Park",
        role: "Ph.D. Candidate",
        interests: "Diffusion Models, Controllable Video Generation",
        email: "sy.park@postech.ac.kr",
        avatar: ["#b968f0", "#3c096c"],
      },
      {
        name: "Minjun Kang",
        role: "Ph.D. Student",
        interests: "Uncertainty Estimation, Medical Imaging",
        email: "mj.kang@postech.ac.kr",
        avatar: ["#9d4edd", "#240046"],
      },
      {
        name: "Hyunwoo Choi",
        role: "Ph.D. Student",
        interests: "Egocentric Vision, Efficient Transformers",
        email: "hw.choi@postech.ac.kr",
        avatar: ["#e0aaff", "#5a189a"],
      },
    ],
  },
  {
    label: "M.S. Students",
    members: [
      {
        name: "Dohyun Yoon",
        role: "M.S. Student",
        interests: "Efficient Vision-Language Models",
        email: "dh.yoon@postech.ac.kr",
        avatar: ["#c77dff", "#240046"],
      },
      {
        name: "Yerin Jang",
        role: "M.S. Student",
        interests: "Video Editing, Generative Models",
        email: "yr.jang@postech.ac.kr",
        avatar: ["#7b2cbf", "#10002b"],
      },
      {
        name: "Junho Seo",
        role: "M.S. Student",
        interests: "Anomaly Detection, Industrial Vision",
        email: "jh.seo@postech.ac.kr",
        avatar: ["#b968f0", "#5a189a"],
      },
    ],
  },
];

export const alumni: Alum[] = [
  {
    name: "Sunwoo Baek",
    degree: "Ph.D. (2025)",
    now: "Research Scientist, Samsung Advanced Institute of Technology",
    email: "sunwoo.baek@alumni.postech.ac.kr",
  },
  {
    name: "Hana Moon",
    degree: "M.S. (2025)",
    now: "ML Engineer, Naver Cloud",
    email: "hana.moon@alumni.postech.ac.kr",
  },
  {
    name: "Taeyang Kwon",
    degree: "M.S. (2024)",
    now: "Ph.D. Student, KAIST",
    email: "ty.kwon@alumni.postech.ac.kr",
  },
  {
    name: "Eunji Cho",
    degree: "Ph.D. (2023)",
    now: "Assistant Professor, Kyungpook National University",
    email: "eunji.cho@alumni.postech.ac.kr",
  },
  {
    name: "Minseok Han",
    degree: "M.S. (2023)",
    now: "Software Engineer, Kakao",
    email: "ms.han@alumni.postech.ac.kr",
  },
];
