import { MdxField } from "@atsnek/jaen-fields-mdx";
import { Fence } from "./Fence";
import { Prose } from "./Prose";
import { QuickLink, QuickLinks } from "./QuickLinks";
import { Callout } from "./Callout";

export interface DocEditorProps {}

export const DocEditor: React.FC<DocEditorProps> = () => {
  return (
    <Prose>
      <MdxField
        name="content"
        components={{
          code: Fence,
          QuickLinks,
          QuickLink,
          Callout,
        }}
      />
    </Prose>
  );
};
