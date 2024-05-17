import { PageConfig, PageProps } from "@atsnek/jaen";
import * as React from "react";

const ProtectedPage: React.FC<PageProps> = () => {
  return (
    <div>
      <h1>Protected Page. You are authenticated.</h1>
    </div>
  );
};

export default ProtectedPage;

export { Head } from "@atsnek/jaen";

export const pageConfig: PageConfig = {
  label: "Jaen Template",
  auth: {
    isRequired: true,
  },
};
