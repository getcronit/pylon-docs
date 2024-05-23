import { PageConfig, PageProps, useAuth } from "@atsnek/jaen";
import * as React from "react";

import { DocEditor } from "@/components/DocEditor";
import { graphql } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  return <DocEditor />;
};

export default IndexPage;

export { Head } from "@atsnek/jaen";

export const pageConfig: PageConfig = {
  label: "Pylon - From Functions to APIs - Instantly",
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
