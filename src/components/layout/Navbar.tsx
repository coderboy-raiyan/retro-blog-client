"use client";

import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Retro Blog",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Blogs", url: "/blogs" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Sign In", url: "/signin" },
    signup: { title: "Sign Up", url: "/signup" },
  },
  className,
}: Navbar1Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if navbar should be visible
      if (currentScrollY < 50) {
        // Always show at the top
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide navbar
        setIsVisible(false);
      }

      // Add background blur when scrolled
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300 border-b",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110 md:h-10 md:w-10">
              <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              Retro<span className="text-primary">Blog</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.url}
                        className="group/nav relative inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.title}
                        <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-0 bg-primary transition-all duration-300 group-hover/nav:w-full" />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <ModeToggle />
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-full px-4"
            >
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-full px-5 shadow-lg shadow-primary/25"
            >
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Menu
                    className={cn(
                      "h-5 w-5 transition-all",
                      isOpen && "rotate-90 scale-0",
                    )}
                  />
                  <X
                    className={cn(
                      "absolute h-5 w-5 transition-all",
                      !isOpen && "-rotate-90 scale-0",
                    )}
                  />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-sm border-l border-border/50 bg-background/95 backdrop-blur-xl"
              >
                <SheetHeader className="border-b border-border/50 pb-6">
                  <SheetTitle>
                    <Link
                      href="/"
                      className="flex items-center gap-2.5"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <span className="text-xl font-bold tracking-tight">
                        Retro<span className="text-primary">Blog</span>
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 py-6">
                  {menu.map((item) => (
                    <SheetClose asChild key={item.title}>
                      <Link
                        href={item.url}
                        className="flex items-center rounded-xl px-4 py-3 text-lg font-medium text-foreground transition-colors hover:bg-muted"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-0 border-t border-border/50 bg-muted/30 p-6">
                  <div className="flex flex-col gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="h-12 rounded-xl text-base"
                    >
                      <Link
                        href={auth.login.url}
                        onClick={() => setIsOpen(false)}
                      >
                        {auth.login.title}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="h-12 rounded-xl text-base shadow-lg shadow-primary/25"
                    >
                      <Link
                        href={auth.signup.url}
                        onClick={() => setIsOpen(false)}
                      >
                        {auth.signup.title}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export { Navbar };
