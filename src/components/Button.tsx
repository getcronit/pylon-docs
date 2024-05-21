import clsx from "clsx";
import { Link } from "gatsby";

const styles = {
  primary:
    "rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500",
  secondary:
    "rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400",
};

export const Button: React.FC<{
  variant?: keyof typeof styles;
  className?: string;
  href?: string;
  [key: string]: any;
}> = ({ variant = "primary", className, href, ...props }) => {
  className = clsx(styles[variant], className);

  if (href) {
    if (href.startsWith("http")) {
      return <a href={href} target="_blank" className={className} {...props} />;
    } else {
      return <Link to={href} className={className} {...props} />;
    }
  }

  return <button className={className} {...props} />;
};
