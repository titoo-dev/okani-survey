"use client";

import { useCallback, useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Client-side analytics hook
export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionIdRef = useRef<string | null>(null);
  const lastPageRef = useRef<string | null>(null);

  // Generate or retrieve session ID
  const getSessionId = useCallback(() => {
    if (typeof window === "undefined") return null;
    
    if (!sessionIdRef.current) {
      // Try to get from sessionStorage first
      const stored = sessionStorage.getItem("analytics_session_id");
      if (stored) {
        sessionIdRef.current = stored;
      } else {
        // Generate new session ID
        const newSessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionIdRef.current = newSessionId;
        sessionStorage.setItem("analytics_session_id", newSessionId);
      }
    }
    
    return sessionIdRef.current;
  }, []);

  // Track event on client side
  const track = useCallback(async (
    event: string,
    data: Record<string, any> = {}
  ) => {
    if (typeof window === "undefined") return;
    
    try {
      const sessionId = getSessionId();
      const currentPage = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      
      const eventData = {
        event,
        page: currentPage,
        referrer: document.referrer || undefined,
        userAgent: navigator.userAgent,
        sessionId,
        metadata: {
          ...data,
          timestamp: new Date().toISOString(),
          url: window.location.href,
        },
      };
      
      // Send to server
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  }, [pathname, searchParams, getSessionId]);

  // Track page view
  const trackPageView = useCallback((page?: string) => {
    const currentPage = page || `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    track("page_view", { page: currentPage });
  }, [track, pathname, searchParams]);

  // Track custom events
  const trackEvent = useCallback((event: string, data?: Record<string, any>) => {
    track(event, data);
  }, [track]);

  // Track survey events
  const trackSurveyStarted = useCallback(() => {
    track("survey_started");
  }, [track]);

  const trackSurveyCompleted = useCallback(() => {
    track("survey_completed");
  }, [track]);

  const trackSurveyAbandoned = useCallback(() => {
    track("survey_abandoned");
  }, [track]);

  // Track button clicks
  const trackButtonClick = useCallback((buttonName: string, data?: Record<string, any>) => {
    track("button_click", { buttonName, ...data });
  }, [track]);

  // Track form submissions
  const trackFormSubmit = useCallback((formName: string, data?: Record<string, any>) => {
    track("form_submit", { formName, ...data });
  }, [track]);

  // Track errors
  const trackError = useCallback((error: string, data?: Record<string, any>) => {
    track("error", { error, ...data });
  }, [track]);

  // Auto-track page views on route changes
  useEffect(() => {
    const currentPage = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    
    // Only track if page actually changed
    if (lastPageRef.current !== currentPage) {
      trackPageView(currentPage);
      lastPageRef.current = currentPage;
    }
  }, [pathname, searchParams, trackPageView]);

  // Track page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        track("page_visible");
      } else {
        track("page_hidden");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [track]);

  // Track before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      track("page_unload");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [track]);

  return {
    track,
    trackPageView,
    trackEvent,
    trackSurveyStarted,
    trackSurveyCompleted,
    trackSurveyAbandoned,
    trackButtonClick,
    trackFormSubmit,
    trackError,
    sessionId: getSessionId(),
  };
}

// Hook for tracking specific events
export function useTrack() {
  const { trackEvent } = useAnalytics();
  return trackEvent;
}
