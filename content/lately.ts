export interface LatelyItem {
  id: string
  phrase: string
  // Each item defines a dot formation when revealed
  // "wave" = rhythmic rows, "scatter" = organic exhale,
  // "uniform" = even field, "geometric" = clean form
  formation: "wave" | "scatter" | "uniform" | "geometric" | "spiral"
}

export const latelyItems: LatelyItem[] = [
  {
    id: "rhythm",
    phrase: "layering rhythm and coordination",
    formation: "wave",
  },
  {
    id: "expression",
    phrase: "a different kind of vocabulary",
    formation: "scatter",
  },
  {
    id: "trying",
    phrase: "trying, failing, adapting, trying again",
    formation: "spiral",
  },
  {
    id: "balance",
    phrase: "balancing the digital and the physical",
    formation: "geometric",
  },
  {
    id: "principles",
    phrase: "the tools change, the principles haven't",
    formation: "uniform",
  },
]
