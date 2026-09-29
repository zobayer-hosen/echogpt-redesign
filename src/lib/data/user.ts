import type { DemoUser } from "@/types";

/** Authentication is out of scope; a demo user is signed in by default. */
export const demoUser: DemoUser = {
  name: "Demo User",
  email: "demo@example.com",
  initials: "DU",
  plan: "free",
};
