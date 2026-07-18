/**
 * Global site identity. All text on the site pulls from these data modules,
 * so real lab content can be swapped in (or wired to the backend API) without
 * touching components.
 */
export const site = {
  shortName: "HAIV Lab",
  name: "Human-centered AI & Vision Lab",
  affiliation: "POSTECH",
  tagline:
    "Building vision intelligence that understands people, scenes, and stories.",
  about: [
    "HAIV Lab studies how machines can see the world the way people need them to — reading scenes, motion, and intent rather than pixels alone.",
    "We publish at top venues in computer vision and machine learning, and we build systems that carry that research into medicine, industry, and everyday life.",
  ],
  email: "contact@haiv.postech.ac.kr",
  phone: "+82-54-279-0000",
  address: {
    line1: "Engineering Building 2, Room 208",
    line2: "77 Cheongam-ro, Nam-gu, Pohang, Gyeongbuk 37673, Republic of Korea",
    mapUrl: "https://map.naver.com/p/search/POSTECH",
  },
};
