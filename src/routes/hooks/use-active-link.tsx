import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type IUseActiveLinkOptions = {
  exact: boolean;
  deep: boolean;
};
export function useActiveLink(
  href: string,
  options: IUseActiveLinkOptions = { exact: false, deep: false }
) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (href === "/") {
      // Special case for the "Home" menu
      setIsActive(pathname === "/");
    } else if (options.exact) {
      setIsActive(pathname === href);
    } else if (options.deep) {
      setIsActive(pathname.includes(href)); // Checks if the `href` exists at any part of the path
    } else {
      setIsActive(pathname.startsWith(href)); // Default prefix check
    }
  }, [pathname, href, options.exact, options.deep]);

  return isActive;
}
