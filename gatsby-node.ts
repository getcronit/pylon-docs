import { GatsbyNode } from "gatsby";
import * as path from "path";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/images": path.resolve(__dirname, "src/images"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
      },
    },
  });
};
