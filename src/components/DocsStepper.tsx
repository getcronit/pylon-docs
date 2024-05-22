import { JaenPage } from "@atsnek/jaen";
import { Link } from "gatsby-plugin-jaen";
import {
  CMSManagement,
  useCMSManagement,
} from "gatsby-plugin-jaen/src/connectors/cms-management";
import { useMemo } from "react";

export interface DocsStepperProps {
  pages: {
    id: string;
    title: string;
  }[];
  currentPage: {
    id: string;
    title: string;
  };
}

const Component: React.FC<DocsStepperProps> = ({ pages, currentPage }) => {
  const previousPage = useMemo(() => {
    const index = pages.findIndex((doc) => doc.id === currentPage.id);
    return pages[index - 1];
  }, [pages, currentPage]);

  const nextPage = useMemo(() => {
    const index = pages.findIndex((doc) => doc.id === currentPage.id);
    return pages[index + 1];
  }, [pages, currentPage]);

  const manager = useCMSManagement();

  return (
    <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
      {previousPage && (
        <div>
          <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
            Previous
          </dt>
          <dd className="mt-1">
            <Link
              to={manager.pagePath(previousPage.id)}
              className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
            >
              <span aria-hidden="true">&larr;</span> {previousPage.title}
            </Link>
          </dd>
        </div>
      )}
      {nextPage && (
        <div className="ml-auto text-right">
          <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
            Next
          </dt>
          <dd className="mt-1">
            <Link
              to={manager.pagePath(nextPage.id)}
              className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
            >
              {nextPage.title} <span aria-hidden="true">&rarr;</span>
            </Link>
          </dd>
        </div>
      )}
    </dl>
  );
};

export const DocsStepper: React.FC<DocsStepperProps> = (props) => {
  return (
    <CMSManagement>
      <Component {...props} />
    </CMSManagement>
  );
};
