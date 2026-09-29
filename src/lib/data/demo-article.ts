/** Original sample article shown inside the fake browser on /extension. */
export const demoArticle = {
  site: "The Browser Report",
  url: "https://reader.example.com/why-side-panels-matter",
  title: "Why side panels are changing how we read the web",
  author: "Sample Author",
  date: "Sep 24, 2026",
  readingTime: "4 min read",
  paragraphs: [
    "For most of the web's history, getting help meant leaving the page you were reading. Side panels change that: the assistant opens beside your tab, keeps the page in view and remembers where you were.",
    "The idea sounds small, but it removes one of the biggest sources of friction in online research. Every time we switch tabs to ask a question, we lose a little context — the paragraph we were on, the table we were comparing, the thought we were forming.",
    "Browser vendors noticed. Chrome now lets extensions open a persistent panel that survives navigation, so an assistant can follow you from a search result to an article to a checkout page without being closed.",
    "Multi-model assistants take this further. Instead of committing to a single AI provider, readers can ask one model for a quick summary and another for a careful critique, then compare the two answers side by side.",
    "Privacy remains the open question. The best tools make page access explicit: nothing is shared until you run an action, and a visible chip shows exactly which page or selection is attached to your prompt.",
    "If the pattern holds, the browser tab may stop being a single window onto a single site. It becomes a workspace — the page on the left, a thinking partner on the right.",
  ],
};

export const demoArticleExcerpt = `${demoArticle.title} — ${demoArticle.paragraphs[0]}`;
