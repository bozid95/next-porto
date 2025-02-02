import {
  IconHome,
  IconNotes,
  IconBrandGithub,
  IconUser,
  IconApps,
} from "@tabler/icons-react";

export const linksMenu = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/",
  },
  {
    title: "Profile",
    icon: (
      <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/profile",
  },
  {
    title: "Notes",
    icon: (
      <IconNotes className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/notes",
  },
  {
    title: "Projects",
    icon: (
      <IconApps className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/projects",
  },
  {
    title: "GitHub",
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://github.com/bozid95",
  },
];
