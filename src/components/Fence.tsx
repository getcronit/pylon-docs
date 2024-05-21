import { Fragment } from "react";
import { Highlight } from "prism-react-renderer";

export const Fence: React.FC<{
  language: string;
  children: string;
  className?: string;
}> = ({ children = "", language = "js", className }) => {
  console.log("Fence", children, language);

  if (className?.match(/language-([a-z]+)/)) {
    return (
      <Highlight
        code={children.trimEnd()}
        language={language}
        theme={undefined}
      >
        {({ className, style, tokens, getTokenProps }) => (
          <code className={className}>
            {tokens.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {line
                  .filter((token) => !token.empty)
                  .map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                {"\n"}
              </Fragment>
            ))}
          </code>
        )}
      </Highlight>
    );
  }

  return <code className={className}>{children}</code>;
};
