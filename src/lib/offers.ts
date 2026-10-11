export interface Offer {
  slug: string;
  name: string;
  price: string;
  priceValue: string;
  priceNote: string;
  cta: string;
  prefill: string;
  features: string[];
  highlight?: boolean;
  scarce?: boolean;
  copy?: string;
  for?: string;
  isCompatibility?: boolean;
}

export const SOLO_OFFERS: Offer[] = [
  {
    slug: "one-question",
    name: "One Question",
    price: "$20",
    priceValue: "20.00",
    priceNote: "written report · follow-up call",
    copy: "Ask one specific question. Doug reads your chart, writes a detailed answer, and walks you through it on a call.",
    features: [
      "One question, answered in writing",
      "Full astrological reasoning behind the answer",
      "Follow-up call to discuss the report",
      "Question must relate to the next 3 years",
    ],
    cta: "Get My Answer",
    prefill: "Hi Doug,\n\nI'd like a one-question reading. Here is my question:\n\n\n\nHere's a bit more context about my situation:\n\n",
    highlight: false,
  },
  {
    slug: "three-questions",
    name: "Three Questions",
    price: "$50",
    priceValue: "50.00",
    priceNote: "written report · follow-up call",
    copy: "Three questions, one thorough report. Doug reads your full chart and answers each question in writing — then you discuss it together on a call.",
    features: [
      "Up to three questions, answered in writing",
      "Broader chart analysis connecting all three",
      "Follow-up call to go through the report together",
      "Questions must relate to the next 3 years",
    ],
    cta: "Get My Answers",
    prefill: "Hi Doug,\n\nI'd like a three-question reading. Here are my questions:\n\n1. \n2. \n3. \n\nHere's a bit more context about my situation:\n\n",
    highlight: true,
  },
];

export const COMPATIBILITY: Offer = {
  slug: "compatibility",
  name: "Compatibility Reading",
  price: "$60",
  priceValue: "60.00",
  priceNote: "written report for both · follow-up call",
  features: [
    "Analysis of all planet inter-relationships",
    "Overall compatibility picture",
    "Timing of moods and phases",
    "Suggestions for improvement",
    "Written report you both keep",
  ],
  cta: "Get Our Reading",
  prefill: "Hi Doug,\n\nI'd like to book a compatibility reading. I want to understand the dynamic between myself and someone close to me — the patterns, the timing, and how we can work better together.\n\nHere's a bit more about where I'm at:\n\n",
  isCompatibility: true,
};

export const TIERS: Offer[] = [
  {
    slug: "first-session",
    name: "First Session",
    price: "$75",
    priceValue: "75.00",
    priceNote: "written report · session call",
    for: "If you've never worked with Doug before, this is where to begin.",
    features: [
      "Written report on your situation and chart",
      "A focused session call to explore it together",
      "Honest insight into what's driving the confusion",
      "A clear outcome — not a preview",
    ],
    cta: "Book First Session",
    highlight: false,
    prefill: "Hi Doug,\n\nI've been thinking about reaching out for a while. There's something I've been sitting with that I haven't been able to see clearly on my own — and I'd like to have a first session to see whether your work might help me find some clarity.\n\nHere's a bit more about where I'm at:\n\n",
  },
  {
    slug: "clarity-session",
    name: "A Clarity Session",
    price: "$125",
    priceValue: "125.00",
    priceNote: "written report · session call",
    for: "When you're ready to go deep — into your relationship, your path, a pattern, or what lies ahead.",
    features: [
      "Written analysis of your chart and current situation",
      "Session call to work through what the chart reveals",
      "Insight into the patterns and timing shaping your life right now",
      "Clarity on your options and what each one means",
      "Concrete next steps you can act on",
    ],
    cta: "Book a Session",
    highlight: true,
    prefill: "Hi Doug,\n\nI'm at a point where I need to understand what's actually happening — in my life, my relationship, or both. I think I need someone who can see the full picture, not just what's on the surface. I'm ready to go into it properly.\n\nHere's a bit more about where I'm at:\n\n",
  },
  {
    slug: "ongoing-guidance",
    name: "Private Ongoing Guidance",
    price: "$250",
    priceValue: "250.00",
    priceNote: "per month · rolling",
    for: "For clients navigating an extended period of change who want a trusted perspective they can return to.",
    features: [
      "Direct access to Doug throughout the month",
      "The only offer with real-time, personal contact",
      "Insight that develops as your situation does",
      "Support at the moments that matter — not just one conversation",
      "Priority responses",
    ],
    cta: "Enquire",
    highlight: false,
    scarce: true,
    prefill: "Hi Doug,\n\nI'm going through an extended period of change — in my relationships and in the decisions in front of me — and I don't think one session is going to be enough. I'd like to understand what it looks like to work with you on an ongoing basis.\n\nHere's a bit more about where I'm at:\n\n",
  },
];

export const ALL_OFFERS: Offer[] = [
  ...SOLO_OFFERS,
  COMPATIBILITY,
  ...TIERS,
];

export function getOfferBySlug(slug: string): Offer | undefined {
  return ALL_OFFERS.find((o) => o.slug === slug);
}
