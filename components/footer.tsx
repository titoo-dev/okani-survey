"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  // Hide footer on admin routes
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/auth")) {
    return null;
  }

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-start md:justify-between lg:px-8">
        <div className="flex flex-col gap-6 md:order-2">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Une initiative de la DGCBF
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-3">
              Support technique WhatsApp
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/24176000000"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                <span>+241 76 00 00 00</span>
              </a>
              <a
                href="https://wa.me/24166000000"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                <span>+241 66 00 00 00</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-sm leading-5 text-muted-foreground">
            &copy; 2025 Okani Survey. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
