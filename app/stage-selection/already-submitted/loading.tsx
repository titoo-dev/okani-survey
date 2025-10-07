export default function AlreadySubmittedLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </div>
    </main>
  );
}

