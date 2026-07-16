import { defineConfig } from "astro/config";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true" && repoName && owner;
const isUserOrOrgPage = repoName?.endsWith(".github.io");

export default defineConfig({
  site: owner ? `https://${owner}.github.io` : "https://example.com",
  base: isGithubPagesBuild && !isUserOrOrgPage ? `/${repoName}` : undefined,
});
