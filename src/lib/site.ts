function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "EchoGPT",
  title: "EchoGPT — Every top AI model. One sidebar.",
  description:
    "Chat with GPT, Claude, Gemini, Llama, Mistral and DeepSeek in one place. Summarize pages, explain selections and compare answers from a Chrome side panel or the web app.",
  url: resolveSiteUrl(),
  productUrl: "https://echogpt.live",
  chromeStoreUrl:
    "https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj",
  repoUrl: "https://github.com/zobayer-hosen/echogpt-redesign",
  extensionVersion: "1.0.5",
  extensionUpdated: "Sep 22, 2026",
  shortcut: "Ctrl/Cmd+Shift+E",
} as const;
