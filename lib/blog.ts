import type { Post } from "./types";

/**
 * Writing. The first entry is published work; add new posts to the top of this
 * array and they appear at the front of the folder.
 */
export const posts: Post[] = [
  {
    id: "generative-ai-student-learning",
    title: "Generative AI and Student Learning",
    outlet: "Both.org",
    date: "Dec 2024",
    summary: "Ethical and cognitive impacts of generative AI in higher education.",
    body: [
      "Written for WRIT 1301 at the University of Minnesota and published on Both.org. I interviewed a UMN professor about how generative AI is changing higher education, then wrote up what it means for student learning and for the policies universities are having to write in a hurry.",
      "The part that stuck with me was how little of the disagreement was actually about cheating. The harder question is what happens to the cognitive work a course is supposed to produce when a tool can skip the middle of it.",
    ],
    art: { motif: "page", from: "#0f766e", to: "#052622", monogram: "AI", accent: "#7fe3d4" },
  },
];
