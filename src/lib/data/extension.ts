import {
  KeyRound,
  Layers,
  type LucideIcon,
  MousePointerClick,
  PanelRight,
  Pin,
  Sparkles,
  Zap,
} from "lucide-react";

/** Content for the /extension concept page (Part C). */

export const extensionIntro = {
  eyebrow: "Chrome extension concept",
  title: "EchoGPT, one shortcut away",
  description:
    "An interactive prototype of the redesigned extension. Select text in the article, run a quick action, switch models or expand the popup into a side panel.",
  hints: [
    "Select any sentence in the article, then try “Explain selection”.",
    "Press Ctrl/Cmd+Shift+E to open or close the popup.",
    "Type “/” in the prompt box to insert a saved prompt.",
  ],
};

export interface ConceptHighlight {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

/** What the concept changes compared with the current extension (UX audit rows 7–9). */
export const conceptHighlights: ConceptHighlight[] = [
  {
    id: "actions",
    title: "Six quick actions + custom",
    description: "Summarize and explain are joined by translate, rewrite, key points and email replies.",
    icon: Zap,
  },
  {
    id: "compare",
    title: "Compare two models",
    description: "A dedicated switch sends one prompt to two models, matching the web app.",
    icon: Layers,
  },
  {
    id: "context",
    title: "Visible page context",
    description: "A chip shows exactly which page or selection is attached, and removes it in one click.",
    icon: MousePointerClick,
  },
  {
    id: "panel",
    title: "Popup ⇄ side panel",
    description: "Start in the popup, then expand to a full-height panel that stays open.",
    icon: PanelRight,
  },
  {
    id: "advanced",
    title: "Technical settings tucked away",
    description: "The API endpoint moves under Settings › Advanced instead of greeting every user.",
    icon: KeyRound,
  },
];

export const onboardingSteps = [
  {
    id: "model",
    title: "Pick your model",
    description: "Choose the AI you want by default. You can switch any time from the header.",
    action: "Choose model",
    icon: Sparkles,
  },
  {
    id: "action",
    title: "Try a quick action",
    description: "Summarize this page or explain a selection with a single click.",
    action: "Open quick actions",
    icon: Zap,
  },
  {
    id: "pin",
    title: "Pin EchoGPT",
    description: "Click the puzzle icon in Chrome's toolbar and pin EchoGPT so it's always one click away.",
    action: "Done",
    icon: Pin,
  },
] as const;

export const translationLanguages = ["Spanish", "French", "German"] as const;
export type TranslationLanguage = (typeof translationLanguages)[number];

export const DEFAULT_API_ENDPOINT = "https://api.echogpt.live/v1";
