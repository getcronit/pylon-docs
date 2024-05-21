import { Icon, Icons } from "@/components/Icon";
import { Link } from "gatsby-plugin-jaen";

export const QuickLink: React.FC<{
  title: string;
  description: string;
  href: string;
  icon: Icons;
}> = ({ title, description, href, icon }) => {
  return (
    <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <div className="relative overflow-hidden rounded-xl p-6">
        <Icon icon={icon} className="h-8 w-8" />
        <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
          <Link to={href}>
            <span className="absolute -inset-px rounded-xl" />
            {title}
          </Link>
        </h2>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
};

QuickLink.displayName = "QuickLink";
QuickLink.defaultProps = {
  title: "Installation",
  description: "Get started with Pylon in minutes.",
  href: "/docs/installation",
  icon: "installation",
};

export const QuickLinks: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {children}
    </div>
  );
};

QuickLinks.displayName = "QuickLinks";
QuickLinks.defaultProps = {
  children: `
<QuickLinks
  title="Installation"
  description="Get started with Pylon in minutes."
  href="/docs/installation"
  icon="installation"
/>
<QuickLink
  title="Presets"
  description="Use one of our presets to get started."
  href="/docs/presets"
  icon="presets"
/>
<QuickLink
  title="Plugins"
  description="Extend Pylon with plugins."
  href="/docs/plugins"
  icon="plugins"
/>
<QuickLink
  title="Theming"
  description="Customize Pylon to fit your brand."
  href="/docs/theming"
  icon="theming"
/>`,
};
