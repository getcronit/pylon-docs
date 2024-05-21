import { useMemo } from "react";
import { useField } from "@atsnek/jaen";
import GithubSlugger from "github-slugger";
import { MdastRoot } from "@atsnek/jaen-fields-mdx/dist/MdxField/components/types";

export type TableOfContentItem = {
  id: string;
  title: string;
  level: number;
  children: TableOfContentItem[];
};

const useTocNavigation = (mdxFieldName?: string, fieldContent?: MdastRoot) => {
  const field = useField<MdastRoot>(mdxFieldName || "", "IMA:MdxField");

  const value = useMemo(() => {
    return fieldContent || field.value || field.staticValue;
  }, [field]);

  const headings = useMemo(() => {
    const slugger = new GithubSlugger();

    if (!value) {
      return [];
    }

    const headings: TableOfContentItem[] = [];
    const stack: TableOfContentItem[] = [];

    value.children.forEach((node) => {
      if (node.type === "heading") {
        // @ts-expect-error
        const text = node.children[0]?.value || "";
        const id = slugger.slug(text);
        const level = node.depth;

        const newItem: TableOfContentItem = {
          id,
          title: text,
          level,
          children: [],
        };

        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop();
        }

        if (stack.length === 0) {
          headings.push(newItem);
        } else {
          stack[stack.length - 1].children.push(newItem);
        }

        stack.push(newItem);
      }
    });

    return headings;
  }, [value]);

  return headings;
};

export default useTocNavigation;
