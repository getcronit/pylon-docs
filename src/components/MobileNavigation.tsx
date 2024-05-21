import { SVGProps, useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import { Logomark } from "@/components/Logo";
import { Navigation, NavigationProps } from "@/components/Navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const MenuIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
};

const CloseIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M5 5l14 14M19 5l-14 14" />
    </svg>
  );
};

export const MobileNavigation: React.FC<{
  navigation: NavigationProps["navigation"];
}> = ({ navigation }) => {
  const router = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [router]);

  return (
    <>
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        // className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
        aria-label="Navigation"
      >
        <SheetTrigger aria-label="Open navigation">
          <MenuIcon className="h-6 w-6 stroke-slate-500" />
        </SheetTrigger>

        <SheetContent
          side="left"
          className="min-h-full w-full max-w-xs bg-white px-4 pt-5 pb-12 dark:bg-slate-900 sm:px-6"
        >
          <div className="flex items-center">
            <Logomark className="w-[200px]" />
          </div>
          <Navigation navigation={navigation} className="mt-5 px-1" />
        </SheetContent>
      </Sheet>
    </>
  );
};
