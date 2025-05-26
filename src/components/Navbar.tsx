import type { JSX } from "react";
import "../styles/global.css";
import { Menu } from "lucide-react";


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
import { SignedIn, SignedOut, UserButton } from "@clerk/astro/react";

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
      url: "/fym",
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
    signup: { text: "Sign up", url: "/signup" },
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
              <NavigationMenu className="font-extralight">
                <NavigationMenuList className="gap-5">
                  {menu.map((item) => renderMenuItem(item))}
                  <SignedIn>
                    <NavigationMenuItem>
                      <a href="/profile">Profile</a>
                    </NavigationMenuItem>
                  </SignedIn>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center rounded-full gap-2">
            <SignedOut>
              <a href="/login">
                <Button
                  size="sm"
                  className="bg-gradient-to-b from-gradient-start to-gradient-end hover:border-2 hover:border-gradient-start hover:bg-gradient-to-b hover:from-white hover:to-white hover:text-primary transition-all duration-100 px-6 rounded-full"
                >
                  Sign in
                </Button>
              </a>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button
                asChild
                size="sm"
                className="text-primary border-2 border-gradient-start px-4 rounded-full hover:border-2 hover:border-gradient-start hover:bg-gradient-to-b hover:from-gradient-start hover:to-gradient-end hover:text-white transition-all duration-100 bg-white"
              >
                <a href="/signup">Sign up</a>
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
                    <a
                      href={logo.url}
                      className="flex items-center gap-2 justify-center"
                    >
                      <img src={logo.src} className="w-20" alt={logo.alt} />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6 px-5">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4 items-center"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                    <SignedIn>
                      <NavigationMenuItem>
                        <a href="/profile">Profile</a>
                      </NavigationMenuItem>
                    </SignedIn>
                  </Accordion>
                  <div className="flex flex-col gap-5">
                    <SignedOut>
                      <Button
                        size="sm"
                        className="bg-gradient-to-b from-gradient-start to-gradient-end hover:border-2 hover:border-gradient-start hover:bg-gradient-to-b hover:from-white hover:to-white hover:text-primary transition-all duration-100 px-6 rounded-full"
                      >
                        <a href="/login">Sign in</a>
                      </Button>
                    </SignedOut>
                    <SignedOut>
                      <Button
                        size="sm"
                        className="bg-gradient-to-b from-gradient-start to-gradient-end rounded-full"
                      >
                        <a href="/signup">Sign up</a>
                      </Button>
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
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
    className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium dark:text-white text-white transition-colors hover:text-shadow-neon"
      href={item.url}
    >
      {item.title}
    </a>

  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0 dark:text-foreground">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline dark:text-foreground">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:text-shadow-neon dark:text-foreground"
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
    <a key={item.title} href={item.url} className="font-semibold hover:text-shadow-neon dark:text-foreground">
      {item.title}
    </a>
  );
};

export { Navbar };
