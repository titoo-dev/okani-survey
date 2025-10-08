"use client";

import { useTransition } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Home, LogOut, User } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { signOutAction } from "@/app/actions/sign-out";
import Image from "next/image";

interface NavigationItem {
  title: string;
  url: string;
}

interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

const navigationIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/dashboard": Home,
  "/dashboard/profile": User,
};

export function AppSidebar({
  navigationItems,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  navigationItems: NavigationGroup[];
}) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      const result = await signOutAction()
      if (result.success) {
        router.push('/admin')
      }
    })
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="relative flex items-center h-16 w-16 transition-opacity hover:opacity-80"
              >
                <Image
                  src="/logo.png"
                  alt="Okani Survey"
                  fill
                  priority
                  className="object-contain"
                />
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navigationItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = navigationIcons[item.url]
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.url}>
                        <Link href={item.url} className="flex items-center gap-2">
                          {Icon && <Icon className="size-4" />}
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-2" disabled={isPending}>
              <LogOut className="size-4" />
              Déconnexion
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Déconnexion</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir vous déconnecter ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSignOut}
                disabled={isPending}
              >
                {isPending ? "Déconnexion..." : "Déconnexion"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
