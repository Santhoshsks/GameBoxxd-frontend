import { Navigation } from "@/components/Navigation";

export default function Games() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Games</h1>
          <p className="text-muted-foreground">
            Browse and discover amazing games. This page is coming soon!
          </p>
        </div>
      </main>
    </div>
  );
}
