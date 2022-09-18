import AstroAuth from "@astro-auth/core";
import { GithubProvider } from "@astro-auth/providers";

export const all = AstroAuth({
  authProviders: [
    GithubProvider({
      clientId: import.meta.env.GITHUB_ID,
      clientSecret: import.meta.env.GITHUB_SECRET
    }),
  ],
});
