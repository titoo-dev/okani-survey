import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mb-12">
          <Skeleton className="h-6 w-32 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2" />
        </div>

        <div className="space-y-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-card/50 backdrop-blur-sm p-8 shadow-sm ring-1 ring-border/50"
            >
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    </main>
  );
}

