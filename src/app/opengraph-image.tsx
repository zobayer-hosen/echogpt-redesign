import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

// 1200×630 social card (UX audit #2: the live site uses its favicon as og:image).
// Generated at build time; colours mirror the design tokens (image output, not UI).
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const models = ["GPT", "Claude", "Gemini", "Llama", "Mistral", "DeepSeek"];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #0e0e12 0%, #221e3a 100%)",
        color: "#ededf0",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "#8b7cff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            color: "#0e0e12",
            fontWeight: 700,
          }}
        >
          E
        </div>
        <div style={{ fontSize: 40, fontWeight: 700 }}>EchoGPT</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          Every top AI model.
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#8b7cff",
            letterSpacing: -2,
          }}
        >
          One sidebar.
        </div>
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        {models.map((model) => (
          <div
            key={model}
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              border: "2px solid #2a2a33",
              background: "#15151b",
              fontSize: 26,
              color: "#cfc8ff",
            }}
          >
            {model}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
