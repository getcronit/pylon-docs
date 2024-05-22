import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
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
