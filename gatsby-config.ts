import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-jaen`,
      options: {
        remote: {
          repository: "cronitio/jaen-template",
        },
        zitadel: {
          organizationId: "252746033782587395",
          clientId: "252746210698395651@services",
          authority: "https://accounts.cronit.io",
          redirectUri:
            process.env.NODE_ENV === "production"
              ? "https://jaen.cronit.io"
              : "http://localhost:8000",
          projectIds: [],
        },
        sentry: {
          org: "cronit",
          project: "jaen-template",
          dsn: "https://8cf5387b2f582fe891bec2f517ed09dc@sentry.cronit.io/5",
        },
      },
    },
    `gatsby-jaen-mailpress`,
    `gatsby-plugin-postcss`,
  ],
};

export default config;
