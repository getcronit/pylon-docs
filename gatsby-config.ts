import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-jaen`,
      options: {
        remote: {
          repository: "getcronit/pylon-docs",
        },
        zitadel: {
          organizationId: "252746033782587395",
          clientId: "252746210698395651@services",
          authority: "https://accounts.cronit.io",
          redirectUri:
            process.env.NODE_ENV === "production"
              ? "https://pylon.cronit.io"
              : "http://localhost:8000",
          projectIds: [],
        },
        sentry: {
          org: "cronit",
          project: "pylon-docs",
          dsn: "https://376807edb69224c1679c8a38499311ff@sentry.cronit.io/18",
        },
      },
    },
    `gatsby-jaen-mailpress`,
    `gatsby-plugin-postcss`,
  ],
};

export default config;
