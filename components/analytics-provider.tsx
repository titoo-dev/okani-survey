"use client";

import { useAnalytics } from "@/hooks/use-analytics";
import { useEffect, Suspense } from "react";

function AnalyticsContent({ children }: { children: React.ReactNode }) {
  const { trackPageView } = useAnalytics();

  // Track initial page view
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  return <>{children}</>;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <AnalyticsContent>{children}</AnalyticsContent>
    </Suspense>
  );
}
