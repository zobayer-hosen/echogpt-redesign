import { demoArticle } from "@/lib/data/demo-article";
import type { TranslationLanguage } from "@/lib/data/extension";

/*
 * Canned replies used by the mock chat service. Rules are checked in order:
 * specific topics first (they back the suggested prompts), then generic intents.
 * Each rule has two variants so compare mode shows different answers per model.
 */

type ReplyVariant = (topic: string) => string;

export interface ReplyRule {
  id: string;
  match: RegExp;
  variants: [ReplyVariant, ReplyVariant];
}

const DEMO_NOTE =
  "> _Demo mode: replies are simulated because no live model is connected. Plug the real API into `lib/services/chat.service.ts` for genuine answers._";

export const replyRules: ReplyRule[] = [
  {
    id: "greeting",
    match: /^\s*(hi|hello|hey|good (morning|afternoon|evening))\b/i,
    variants: [
      () =>
        "Hi there! 👋 I can help you **write**, **research**, **code** or **summarize** anything.\n\nTry one of these:\n\n- Paste an article and ask for key points\n- Ask me to explain a concept “like I'm new to it”\n- Turn on **Compare** to see two models answer side by side",
      () =>
        "Hello! What are we working on today?\n\nA few ideas:\n\n1. Draft or polish an email\n2. Explain a tricky concept\n3. Debug a piece of code",
    ],
  },
  {
    id: "llm",
    match: /\b(large language models?|llms?|language models?)\b/i,
    variants: [
      () =>
        "Think of a large language model as a **very well-read autocomplete**.\n\n1. **Training:** it reads a huge amount of text and learns which words tend to follow others, and why.\n2. **Prompting:** when you ask something, it predicts a helpful answer one small piece (a *token*) at a time.\n3. **Context:** it only “sees” what's in the conversation, which is why pasting the relevant page helps.\n\n**Everyday analogy:** it's like a friend who has read every cookbook — they can improvise a recipe, but they can still misremember a detail, so double-check anything important.",
      () =>
        "In one line: an LLM is a statistical model that **predicts the next token** extremely well.\n\n| Stage | What happens |\n| --- | --- |\n| Pre-training | Learns language patterns from large text collections |\n| Fine-tuning | Learns to follow instructions and be helpful |\n| Inference | Generates your answer token by token |\n\n**Analogy:** a musician who has heard thousands of songs can improvise a new melody in any style — but it's still improvisation, not memory.",
    ],
  },
  {
    id: "debounce",
    match: /\b(debounce|throttle)\b/i,
    variants: [
      () =>
        'Here\'s a small, typed `debounce` helper. It delays calling `fn` until `wait` ms have passed without another call.\n\n```ts\nexport function debounce<Args extends unknown[]>(\n  fn: (...args: Args) => void,\n  wait = 300,\n) {\n  let timer: ReturnType<typeof setTimeout> | undefined;\n\n  return (...args: Args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), wait);\n  };\n}\n```\n\n**Usage**\n\n```ts\nconst search = debounce((query: string) => fetchResults(query), 250);\ninput.addEventListener("input", (e) => search(e.currentTarget.value));\n```\n\n- The generic `Args` keeps the original parameter types.\n- `clearTimeout` resets the timer on every call, so only the last call runs.',
      () =>
        "A version with a `cancel()` method is handy for React effects:\n\n```ts\ntype Debounced<Args extends unknown[]> = ((...args: Args) => void) & { cancel: () => void };\n\nexport function debounce<Args extends unknown[]>(fn: (...args: Args) => void, wait = 300) {\n  let timer: ReturnType<typeof setTimeout> | undefined;\n  const debounced = ((...args: Args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), wait);\n  }) as Debounced<Args>;\n  debounced.cancel = () => clearTimeout(timer);\n  return debounced;\n}\n```\n\nCall `debounced.cancel()` in the effect cleanup so nothing fires after unmount.\n\n| Technique | When to use |\n| --- | --- |\n| Debounce | Search boxes, resize handlers |\n| Throttle | Scroll position, drag events |",
    ],
  },
  {
    id: "remote-work",
    match: /\bremote work\b/i,
    variants: [
      () =>
        "**Summary: remote work**\n\n- **Pro:** no commute, flexible hours, access to a global talent pool\n- **Pro:** fewer interruptions for deep, focused work\n- **Con:** harder spontaneous collaboration and mentoring\n- **Con:** blurred boundaries between work and home\n- **Takeaway:** hybrid setups with clear “together days” capture most of the benefits",
      () =>
        "Key points in brief:\n\n1. Flexibility and zero commute are the biggest wins.\n2. Focused work gets easier; collaborative work gets harder.\n3. Isolation and over-working are the main risks.\n4. Written communication becomes a core skill.\n5. Teams with explicit norms get the best of both worlds.",
    ],
  },
  {
    id: "meeting-email",
    match:
      /\b(1:1|one-on-one|meeting)\b.*\b(email|move|reschedule)\b|\b(email|move|reschedule)\b.*\b(1:1|meeting)\b/i,
    variants: [
      () =>
        "**Subject:** Moving our 1:1 to Thursday?\n\nHi Sam,\n\nWould it be possible to move our 1:1 this week to **Thursday**? Something came up on my calendar, and Thursday afternoon would let me come better prepared. Any time after 2 pm works for me.\n\nThanks for being flexible!\n\nBest,\nAlex",
      () =>
        "Here's a short, friendly version:\n\n> Hi Sam — could we shift this week's 1:1 to Thursday? I have a clash on our usual day. I'm free after 2 pm and happy to work around you. Thanks!\n\n*Tip:* offer one or two concrete slots to make it easy to say yes.",
    ],
  },
  {
    id: "compare",
    match: /\b(compare|vs\.?|versus|difference between|pros and cons)\b/i,
    variants: [
      (topic) =>
        `A side-by-side look at **${topic}**:\n\n| Aspect | Option A | Option B |\n| --- | --- | --- |\n| Learning curve | Gentle | Steeper |\n| Flexibility | Good | Excellent |\n| Tooling | Mature | Growing fast |\n| Best for | Simple, stable needs | Complex, evolving needs |\n\n**Bottom line:** start with the simpler option and switch when you hit a clear limit.`,
      (topic) =>
        `Short answer: it depends on your constraints. For **${topic}**, ask three questions:\n\n1. **Who maintains it?** Pick what your team already knows.\n2. **How will it change?** Flexible options pay off when requirements move.\n3. **What does switching cost later?** Prefer reversible choices.\n\n> Tip: prototype both for an hour — the friction you feel is the best data you'll get.`,
    ],
  },
  {
    id: "code",
    match: /\b(code|function|typescript|javascript|react|python|bug|regex|sql|api|css)\b/i,
    variants: [
      (topic) =>
        `Here's a clean starting point for **${topic}**:\n\n\`\`\`ts\ntype Result<T> = { ok: true; value: T } | { ok: false; error: string };\n\nexport function solve(input: string): Result<string> {\n  if (!input.trim()) return { ok: false, error: "Input is empty" };\n  // TODO: replace with your real logic\n  return { ok: true, value: input.trim() };\n}\n\`\`\`\n\n- Returns a typed \`Result\` instead of throwing.\n- Validates input first, so edge cases are explicit.\n\n${DEMO_NOTE}`,
      (topic) =>
        `A step-by-step plan for **${topic}**:\n\n1. Write a failing test that captures the expected behaviour.\n2. Implement the smallest change that passes it.\n3. Refactor names and extract helpers.\n\n\`\`\`ts\nimport { describe, expect, it } from "vitest";\n\ndescribe("solve", () => {\n  it("rejects empty input", () => {\n    expect(solve("  ").ok).toBe(false);\n  });\n});\n\`\`\`\n\n${DEMO_NOTE}`,
    ],
  },
  {
    id: "summary",
    match: /\b(summar\w*|key points|tl;?dr|bullet)\b/i,
    variants: [
      (topic) =>
        `**Summary** — ${topic}\n\n- The main idea in one line\n- The strongest supporting point\n- The biggest caveat\n- What to do next\n\nPaste the full text and I'll fill these in precisely.\n\n${DEMO_NOTE}`,
      (topic) =>
        `Here's a quick TL;DR structure for **${topic}**:\n\n1. **Context** — why it matters now\n2. **Key facts** — three to five bullets\n3. **Takeaway** — one sentence you can act on\n\n${DEMO_NOTE}`,
    ],
  },
  {
    id: "email",
    match: /\b(email|e-mail|letter|reply to)\b/i,
    variants: [
      (topic) =>
        `**Draft**\n\nHi there,\n\nI'm writing about ${topic.toLowerCase()}. Could we find a moment this week to go over it? I've put together a few notes and would value your input.\n\nThanks in advance,\nAlex`,
      () =>
        "A crisp structure for any email:\n\n1. **One-line purpose** — what you need\n2. **Context** — two sentences max\n3. **Clear ask** — with a date\n4. **Friendly close**\n\nTell me the recipient and tone, and I'll write it.",
    ],
  },
  {
    id: "explain",
    match: /\b(explain|what is|what are|how does|how do|why)\b/i,
    variants: [
      (topic) =>
        `Let's break **${topic}** down simply:\n\n- **What it is:** the core idea in one sentence.\n- **Why it matters:** the problem it solves.\n- **How it works:** a few steps from input to result.\n\nShare a specific example and I'll walk through it line by line.\n\n${DEMO_NOTE}`,
      (topic) =>
        `Think of **${topic}** like learning to cook: first the ingredients (the parts), then the recipe (how they combine), then practice (real examples).\n\nWhich part should we zoom into?\n\n${DEMO_NOTE}`,
    ],
  },
  {
    id: "general",
    match: /[\s\S]*/,
    variants: [
      (topic) =>
        `Here's a structured way to approach **“${topic}”**:\n\n1. **Clarify the goal** — what would a great outcome look like?\n2. **Break it down** — list what you know and what's missing.\n3. **Gather inputs** — examples, constraints and sources.\n4. **Decide and act** — pick the smallest next step.\n\n${DEMO_NOTE}`,
      (topic) =>
        `A few angles on **“${topic}”**:\n\n- **Quick take:** start simple and iterate.\n- **Watch out for:** assumptions that haven't been tested.\n- **Next step:** tell me more about your context and I'll tailor this.\n\n${DEMO_NOTE}`,
    ],
  },
];

/* ----------------------------------------------------------------------------
 * Extension quick-action replies (based on the demo article)
 * ------------------------------------------------------------------------- */

const translations: Record<TranslationLanguage, string> = {
  Spanish:
    "Durante la mayor parte de la historia de la web, pedir ayuda significaba abandonar la página que estabas leyendo. Los paneles laterales cambian eso: el asistente se abre junto a tu pestaña, mantiene la página a la vista y recuerda dónde estabas.",
  French:
    "Pendant la majeure partie de l'histoire du web, obtenir de l'aide signifiait quitter la page que vous lisiez. Les panneaux latéraux changent la donne : l'assistant s'ouvre à côté de votre onglet, garde la page visible et se souvient de l'endroit où vous étiez.",
  German:
    "Lange Zeit bedeutete Hilfe im Web, die Seite zu verlassen, die man gerade las. Seitenleisten ändern das: Der Assistent öffnet sich neben deinem Tab, lässt die Seite sichtbar und merkt sich, wo du warst.",
};

const FILLER_WORDS = /\b(very|really|just|actually|basically|quite|simply)\s+/gi;

function keyTerms(text: string) {
  const words = text.toLowerCase().match(/[a-z][a-z-]{5,}/g) ?? [];
  return [...new Set(words)].sort((a, b) => b.length - a.length).slice(0, 3);
}

export interface ActionReplyInput {
  selection: string;
  language: TranslationLanguage;
}

export const actionReplies: Record<string, (input: ActionReplyInput) => string> = {
  summarize: () =>
    `**Summary of “${demoArticle.title}”**\n\nSide panels let an AI assistant open *beside* the page instead of in a new tab, so readers keep their context while asking questions. Chrome's persistent panel follows you across sites, and multi-model assistants let you compare answers from different AIs. The main open question is privacy, which the best tools answer by sharing page content only on request.`,
  "key-points": () =>
    "**Key points**\n\n- Switching tabs to ask for help breaks reading context.\n- Side panels keep the page and the assistant visible together.\n- Chrome's panel persists across navigation.\n- Multi-model tools let you compare a quick summary with a careful critique.\n- Good privacy design: explicit actions and a visible context chip.",
  translate: ({ language }) =>
    `**Opening paragraph in ${language}:**\n\n> ${translations[language]}\n\nChange the target language in **Settings › Language**.`,
  explain: ({ selection }) => {
    const terms = keyTerms(selection);
    const focus = terms.length
      ? `it hinges on ${terms.map((term) => `**${term}**`).join(", ")}`
      : "the idea is simpler than it looks";
    return `**In plain words**\n\n> ${selection}\n\nThe author is making one point here, and ${focus}. Read it as *“here's the situation, and here's why it matters to you as a reader.”*\n\nWant an example or a one-line version?`;
  },
  rewrite: ({ selection }) => {
    const improved = selection
      .replace(FILLER_WORDS, "")
      .replace(/\s{2,}/g, " ")
      .trim();
    return `**Improved version**\n\n> ${improved}\n\n**What changed**\n\n- Removed filler words and repetition\n- Kept your meaning and tone\n- Ready to paste back`;
  },
  "reply-email": () =>
    "This page looks like an article, not an email. Open a message in Gmail or Outlook and run **Reply to email** again.\n\nMeanwhile, here's a template you can adapt:\n\n> Hi —\n> Thanks for your message. I've read it and will get back to you with details by Friday.\n> Best regards",
};
