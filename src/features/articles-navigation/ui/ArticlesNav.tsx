"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";

export interface INavigationItem {
    id: number
    name: string
    href: string
}

const navigationItems: INavigationItem[] = [
  {
    id: 1,
    name: "Главная",
    href: "/",
  },
  {
    id: 2,
    name: "Подписки",
    href: "/feed",
  },
];

export const ArticlesNavigation = () => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="space-y-2" role="navigation">
      <div className="flex flex-wrap items-center gap-3">
        {navigationItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              href={item.href}
              key={item.id}
            >
              <Button
                size="lg"
                variant={active ? "default" : "ghost"}
              >
                {item.name}
              </Button>
            </Link>
          );
        })}
      </div>
      <Separator />
    </div>
  );
};
