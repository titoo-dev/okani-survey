import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {

	const navigationItems = [
		{
			title: "Dashboard",
			items: [
				{
					title: "Statistiques",
					url: "/admin/dashboard/statistics",
				},
				{
					title: "Liste des enquêtes",
					url: "/admin/dashboard/surveys",
				},
			],
		}
	]

	return (
		<SidebarProvider>
			<AppSidebar navigationItems={navigationItems} />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}