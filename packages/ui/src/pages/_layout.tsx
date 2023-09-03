import { Link, LinkProps, useMatch } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function NavLink({
  className,
  to,
  ...props
} : LinkProps) {
  const isActive = !!useMatch(to.toString());
  const classes = twMerge("text-blue-300 hover:text-blue-100 p-2", isActive ? "bg-slate-500" : "", className);
  return (
    <Link {...props} to={to} className={classes} />
  )
}

export function Layout ({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <div className="bg-slate-700 h-screen text-white overflow-auto">
      <header className="bg-slate-600 shadow p-2 flex gap-2 items-center">
        <h1 className="text-xl">Short URL</h1>
        <nav className="flex gap-2">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create">Create</NavLink>
        </nav>
      </header>
      {children}
    </div>
  );
}
