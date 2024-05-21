import { DocEditor } from "@/components/DocEditor";
import { PageConfig } from "@atsnek/jaen";
import { PageProps, graphql } from "gatsby";
import * as React from "react";

const Page: React.FC<PageProps> = () => {
  return <DocEditor />;
};

export default Page;

export { Head } from "@atsnek/jaen";

export const pageConfig: PageConfig = {
  label: "Doc Page",
};

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
  }
`;
