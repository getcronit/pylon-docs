import { PageConfig } from "@atsnek/jaen";
import { graphql } from "gatsby";

const Page = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Impressum</h1>
      <div className="text-lg mb-2">
        <p className="font-semibold">cronit KG</p>
        <p>Inhaber: Nico Schett</p>
        <p>Löwengasse 28 / 4</p>
        <p>1030, Wien, Österreich</p>
      </div>
      <div className="text-lg mb-2">
        <p>
          Email: <a href="mailto:office@cronit.io">office@cronit.io</a>
        </p>
        <p>
          Telefon: <a href="tel:+4319929912">+43 1 9929912</a>
        </p>
      </div>
    </>
  );
};

export default Page;

export const pageConfig: PageConfig = {
  label: "Imprint",
};

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
  }
`;
