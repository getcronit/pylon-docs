import { Logo, Logomark } from "@/components/Logo";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Navigation, NavigationProps } from "@/components/Navigation";
import { Search } from "@/components/Search";
import { cn } from "@/lib/utils";
import {
  LayoutProps,
  useAuth,
  useContentManagement,
  useJaenPageIndex,
  usePage,
} from "@atsnek/jaen";
import { Link } from "gatsby-plugin-jaen";
import { SVGProps, useCallback, useEffect, useMemo, useState } from "react";

import { Hero } from "@/components/Hero";
import { Prose } from "@/components/Prose";
import useTocNavigation, {
  TableOfContentItem,
} from "@/hooks/use-toc-navigation";
import "focus-visible";
import { useCMSManagement } from "gatsby-plugin-jaen/src/connectors/cms-management";
import { DocsStepper } from "@/components/DocsStepper";

const GitHubIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  );
};

const Header: React.FC<{
  navigation: NavigationProps["navigation"];
}> = ({ navigation }) => {
  let [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-3 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8",
        isScrolled
          ? "dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75"
          : "dark:bg-transparent"
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation navigation={navigation} />
      </div>
      <div className="relative flex flex-grow basis-0 items-center">
        <Link to="/" aria-label="Home page">
          <Logomark className="lg:hidden" />
          <Logo className="hidden fill-slate-700 dark:fill-sky-100 lg:block" />
        </Link>
      </div>
      <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
        <Search />
      </div>
      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
        <Link
          href="https://github.com/getcronit/pylon"
          isExternal
          className="group"
          aria-label="Pylon on GitHub"
        >
          <GitHubIcon className="h-6 w-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
        </Link>
      </div>
    </header>
  );
};

function useTableOfContents(tableOfContents: TableOfContentItem[]) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id);

  let getHeadings = useCallback(
    (tableOfContents: TableOfContentItem[]) => {
      const items = tableOfContents
        .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
        .map((id) => {
          let el = document.getElementById(id);

          if (!el) return;

          let style = window.getComputedStyle(el);
          let scrollMt = parseFloat(style.scrollMarginTop);

          let top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
          return { id, top };
        });

      // Filter out items that are not in the document
      return items.filter(Boolean) as { id: string; top: number }[];
    },
    [tableOfContents]
  );

  useEffect(() => {
    if (tableOfContents.length === 0) return;

    function onScroll() {
      let headings = getHeadings(tableOfContents);

      let top = window.scrollY;

      let current = headings[0]?.id;
      for (let heading of headings) {
        if (top >= heading.top) {
          current = heading.id;
        } else {
          break;
        }
      }
      setCurrentSection(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, [getHeadings, tableOfContents]);

  return currentSection;
}

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  const isHomePage = pageProps.location.pathname === "/";

  const page = usePage({});

  const title = page.jaenPageMetadata?.title;

  const section = {
    title:
      page.jaenPageMetadata?.blogPost?.category || isHomePage
        ? "Introduction"
        : "Uncategorized",
  };

  const docsIndex = useJaenPageIndex({
    jaenPageId: "JaenPage /docs/",
    sortByPageOrder: true,
  });

  const navigation = useMemo(() => {
    const items: NavigationProps["navigation"] = [
      {
        title: "Introduction",
        links: [{ title: "Getting started", href: "/" }],
      },
    ];

    // Loop through the docs index and create a navigation tree based on the categories
    docsIndex.childPages.forEach((doc) => {
      const category =
        doc.jaenPageMetadata?.blogPost?.category || "Uncategorized";
      let categoryItem = items.find((item) => item.title === category);

      if (!categoryItem) {
        categoryItem = { title: category, links: [] };
        items.push(categoryItem);
      }

      categoryItem.links.push({
        title: doc.jaenPageMetadata?.title || "Untitled",
        href: `/docs/${doc.slug}`,
      });
    });

    items.push({
      title: "Legal",
      links: [
        {
          title: "Imprint",
          href: "/imprint",
        },
      ],
    });

    return items;
  }, [docsIndex]);

  const tableOfContents = useTocNavigation("content");

  const currentSection = useTableOfContents(tableOfContents);

  function isActive(section) {
    if (section.id === currentSection) {
      return true;
    }
    if (!section.children) {
      return false;
    }
    return section.children.findIndex(isActive) > -1;
  }

  const isDocsOrHome =
    pageProps.location.pathname.startsWith("/docs") || isHomePage;

  if (!isDocsOrHome) {
    return (
      <>
        <Header navigation={navigation} />

        <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
          <div className="hidden lg:relative lg:block lg:flex-none">
            <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
            <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto py-16 pl-0.5">
              <div className="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
              <div className="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block" />
              <Navigation
                navigation={navigation}
                className="w-64 pr-8 xl:w-72 xl:pr-16"
              />
            </div>
          </div>
          <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
            {children}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header navigation={navigation} />

      {isHomePage && <Hero />}

      <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto py-16 pl-0.5">
            <div className="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
            <div className="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block" />
            <Navigation
              navigation={navigation}
              className="w-64 pr-8 xl:w-72 xl:pr-16"
            />
          </div>
        </div>
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          <article>
            {(title || section) && (
              <header className={cn("mb-9 space-y-1")}>
                {section && (
                  <p className="font-display text-sm font-medium text-sky-500">
                    {section.title}
                  </p>
                )}
                {title && (
                  <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
              </header>
            )}
            <Prose>
              <p
                className={cn({
                  lead: isHomePage,
                })}
              >
                {page.jaenPageMetadata?.description}
              </p>

              {!isHomePage ? (
                <>
                  <hr />
                  <br />
                </>
              ) : (
                <br />
              )}
            </Prose>

            {children}
          </article>
          <DocsStepper
            pages={[
              {
                id: "JaenPage /",
                title: "Getting started",
              },
              ...docsIndex.childPages.map((doc) => ({
                id: doc.id,
                title: doc.jaenPageMetadata?.title || "Untitled",
              })),
            ]}
            currentPage={{
              id: page.id,
              title: page.jaenPageMetadata?.title || "Untitled",
            }}
          />
        </div>
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="font-display text-sm font-medium text-slate-900 dark:text-white"
                >
                  On this page
                </h2>
                <ol role="list" className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link
                          to={`#${section.id}`}
                          className={cn(
                            "font-normal !text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
                            {
                              "!text-sky-500": isActive(section),
                            }
                          )}
                        >
                          {section.title}
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ol
                          role="list"
                          className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                        >
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link
                                to={`#${subSection.id}`}
                                className={cn(
                                  "hover:text-slate-600 dark:hover:text-slate-300 ",
                                  {
                                    "!text-sky-500": isActive(subSection),
                                  }
                                )}
                              >
                                {subSection.title}
                              </Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Layout;
