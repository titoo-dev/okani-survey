"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Filter, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { DashboardData, DashboardFilters } from "@/app/actions/dashboard";
import { exportSurveysToCSV } from "@/app/actions/dashboard";
import { toast } from "sonner";

const CITIES = ["Libreville", "Lambaréné", "Mouila"];
const STAGES = [
  "Dépôt de dossier",
  "Enquête foncière",
  "État des lieux",
  "Avis d'affichage",
  "PV et plan de bornage",
  "Rapport d'évaluation",
  "Décision",
];

type SurveysClientProps = {
  initialData: DashboardData;
  initialFilters: DashboardFilters;
};

export function SurveysClient({
  initialData,
  initialFilters,
}: SurveysClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isExporting, setIsExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState<DashboardFilters>(initialFilters);

  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === "all" ? undefined : value,
    };
    setFilters(newFilters);

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`/admin/dashboard/surveys?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery("");
    startTransition(() => {
      router.push("/admin/dashboard/surveys");
    });
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const csvContent = await exportSurveysToCSV(filters);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `okani-survey-${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Export CSV réussi");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Erreur lors de l'export CSV");
    } finally {
      setIsExporting(false);
    }
  };

  const hasActiveFilters = filters.city || filters.stage || searchQuery;

  // Filter surveys based on search query
  const filteredSurveys = initialData.recentSurveys.filter((survey) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      survey.email.toLowerCase().includes(query) ||
      survey.depositCity.toLowerCase().includes(query) ||
      survey.stageReached.toLowerCase().includes(query) ||
      survey.id.toLowerCase().includes(query)
    );
  });

  const getStageBadgeColor = (stage: string) => {
    switch (stage) {
      case "Dépôt de dossier":
        return "bg-chart-1/10 text-chart-1 border-chart-1/20";
      case "Enquête foncière":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "Avis d'affichage":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "PV et plan de bornage":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20";
      case "Rapport d'évaluation":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      case "Décision":
        return "bg-stat-warning/10 text-stat-warning border-stat-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Liste des enquêtes
          </h1>
          <p className="text-muted-foreground">
            Consultez et exportez les données des enquêtes
          </p>
        </div>
        <Button
          onClick={handleExportCSV}
          disabled={isExporting || isPending}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Export en cours..." : "Exporter CSV"}
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <CardTitle>Filtres et Recherche</CardTitle>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Effacer
              </Button>
            )}
          </div>
          <CardDescription>
            Filtrez et recherchez dans les enquêtes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recherche</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Email, ville, étape..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ville</label>
              <Select
                value={filters.city || "all"}
                onValueChange={(value) => handleFilterChange("city", value)}
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les villes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  {CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Étape</label>
              <Select
                value={filters.stage || "all"}
                onValueChange={(value) => handleFilterChange("stage", value)}
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les étapes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les étapes</SelectItem>
                  {STAGES.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Surveys Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Enquêtes ({filteredSurveys.length})
          </CardTitle>
          <CardDescription>
            Liste complète des enquêtes soumises
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left font-medium">ID</th>
                  <th className="pb-3 text-left font-medium">Email</th>
                  <th className="pb-3 text-left font-medium">Ville</th>
                  <th className="pb-3 text-left font-medium">Étape</th>
                  <th className="pb-3 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSurveys.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      Aucune enquête trouvée
                    </td>
                  </tr>
                ) : (
                  filteredSurveys.map((survey) => (
                    <tr 
                      key={survey.id} 
                      className="border-b transition-colors hover:bg-muted/50 cursor-pointer"
                      onClick={() => router.push(`/admin/dashboard/surveys/${survey.id}`)}
                    >
                      <td className="py-3 font-mono text-xs text-muted-foreground">
                        {survey.id.slice(0, 8)}...
                      </td>
                      <td className="py-3">{survey.email}</td>
                      <td className="py-3">
                        <Badge variant="outline" className="font-normal">
                          {survey.depositCity}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge 
                          variant="outline" 
                          className={getStageBadgeColor(survey.stageReached)}
                        >
                          {survey.stageReached}
                        </Badge>
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {new Date(survey.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

