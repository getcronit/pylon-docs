import * as React from "react";
import { Link, HeadFC, PageProps, graphql } from "gatsby";
import { PageConfig } from "@atsnek/jaen";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-sm font-medium text-slate-900 dark:text-white">
        404
      </h2>
      <h1 className="mt-3 text-3xl text-slate-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        className="mt-8 text-sm font-medium text-slate-900 dark:text-white"
        to="/"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;

export { Head } from "@atsnek/jaen";

export const pageConfig: PageConfig = {
  label: "404",
};

export const query = graphql`
  query ($jaenPageId: String!) {
    jaenPage(id: { eq: $jaenPageId }) {
      ...JaenPageData
      childPages {
        ...JaenPageChildrenData
      }
    }
    allJaenPage(filter: { id: { in: ["JaenPage /docs/"] } }) {
      nodes {
        id
        childPagesOrder
        jaenPageMetadata {
          title
          blogPost {
            category
          }
        }
        childPages {
          ...JaenPageChildrenData
        }
      }
    }
  }
`;
