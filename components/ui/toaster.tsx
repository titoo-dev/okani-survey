"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "group toast",
          title: "text-sm font-semibold",
          description: "text-sm opacity-90",
          success: "group-[.toast]:bg-green-500 group-[.toast]:text-white",
          error: "group-[.toast]:bg-red-500 group-[.toast]:text-white",
          warning: "group-[.toast]:bg-yellow-500 group-[.toast]:text-white",
          info: "group-[.toast]:bg-blue-500 group-[.toast]:text-white",
        },
      }}
      richColors
    />
  );
}
