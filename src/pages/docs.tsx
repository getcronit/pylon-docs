import * as React from "react";
import { Link, HeadFC, PageProps, graphql } from "gatsby";
import { PageConfig } from "@atsnek/jaen";

const Page: React.FC<PageProps> = () => {
  return null;
};

export default Page;

export { Head } from "@atsnek/jaen";

export const pageConfig: PageConfig = {
  label: "Docs",
  childTemplates: ["DocPage"],
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
