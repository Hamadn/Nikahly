import type { JSX } from "react";
import "../styles/global.css";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/astro/react";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: JSX.Element;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/whiteLogo.svg",
    alt: "logo",
  },
  menu = [
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Find Your Match",
      url: "/find-your-match",
    },
    {
      title: "Pricing",
      url: "/pricing",
    },
    {
      title: "Guides",
      url: "/guides",
    },
  ],
  auth = {
    login: { text: "Log in", url: "/login" },
    signup: { text: "Sign up", url: "/register" },
  },
}: Navbar1Props) => {
  return (
    <section className="py-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex items-center bg-primary rounded-3xl px-10 py-2">
          <div className="flex items-center gap-4 w-full">
            <a href={logo.url} className="flex items-center">
              <img src={logo.src} className="w-20" alt={logo.alt} />
            </a>
            <div className="flex items-center m-auto">
              <NavigationMenu>
                <NavigationMenuList className="gap-5">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center  rounded-full gap-2">
            <SignedOut>
          <Button asChild size="sm" className="bg-gradient-to-b from-gradient-start to-gradient-end transition-all duration-300 px-5 rounded-full">
                <SignInButton>
                  Login
                </SignInButton>
              </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Button asChild size="sm" className="bg-secondary text-primary border-2 border-gradient-start px-5 rounded-full">
                  <SignUpButton />
                </Button>
              </SignedOut>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between bg-primary rounded-3xl px-10 py-2">
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-20" alt={logo.alt} />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon">
                  <Menu className="size-8" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="w-20" alt={logo.alt} />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="flex flex-col gap-3">
                  <SignedOut>
                    <Button asChild size="sm" className="bg-gradient-to-b from-gradient-start to-gradient-end transition-all duration-300 rounded-full">
                      <SignInButton />
                    </Button>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <Button asChild size="sm" className="bg-gradient-to-b from-gradient-start to-gradient-end rounded-full">
                      <SignUpButton />
                    </Button>
                  </SignedOut>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-muted-foreground">
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            <NavigationMenuLink>
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <a
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors drop-shadow-neonWhite"
                    href={subItem.url}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <a
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium text-secondary transition-colors hover:text-shadow-neon"
      href={item.url}
    >
      {item.title}
    </a>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:text-shadow-neon"
              href={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-muted-foreground">
                    {subItem.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="font-semibold hover:text-shadow-neon">
      {item.title}
    </a>
  );
};

export { Navbar };
