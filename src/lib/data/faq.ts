import type { FaqItem } from "@/types";

/** Sample answers for the concept; confirm against echogpt.live before publishing. */
export const faqs: FaqItem[] = [
  {
    id: "faq-what",
    question: "What is EchoGPT?",
    answer:
      "EchoGPT is a multi-model AI assistant. You can chat with several leading AI models from one web app or from a Chrome side panel, and switch or compare models at any time.",
  },
  {
    id: "faq-free",
    question: "Is EchoGPT free?",
    answer:
      "Yes. The Free plan includes several models, page summaries and explain-selection. Pro unlocks every model, compare mode and higher limits.",
  },
  {
    id: "faq-models",
    question: "Which AI models can I use?",
    answer:
      "Models from OpenAI, Anthropic, Google, Meta, Mistral and DeepSeek. Pick one per conversation or send the same prompt to two models to compare their answers.",
  },
  {
    id: "faq-extension",
    question: "How do I open the extension?",
    answer:
      "After installing, pin EchoGPT to your toolbar and click the icon, or press Ctrl+Shift+E (Cmd+Shift+E on Mac). You can expand the popup into a side panel that stays open while you browse.",
  },
  {
    id: "faq-privacy",
    question: "Does EchoGPT read every page I visit?",
    answer:
      "No. Page content is only sent when you run an action such as Summarize or attach the page to a prompt. You can remove the page context from any message and clear your history in Settings.",
  },
  {
    id: "faq-sync",
    question: "Are my chats synced between the extension and the web app?",
    answer:
      "Yes — conversations started in the extension appear in the web app history, so you can continue a chat on a bigger screen.",
  },
  {
    id: "faq-browsers",
    question: "Which browsers are supported?",
    answer:
      "The extension is built for Google Chrome. The web app works in any modern browser on desktop, tablet and mobile.",
  },
];
