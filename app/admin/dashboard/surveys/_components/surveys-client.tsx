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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Download, Filter, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { PaginatedSurveysData, DashboardFilters } from "@/app/actions/dashboard";
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
  initialData: PaginatedSurveysData;
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
  const currentPage = initialFilters.page || 1;

  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === "all" ? undefined : value,
      page: 1, // Reset to first page when filter changes
    };
    setFilters(newFilters);

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      params.set("page", "1");
      router.push(`/admin/dashboard/surveys?${params.toString()}`);
    });
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`/admin/dashboard/surveys?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    setFilters({ page: 1 });
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

  // Filter surveys based on search query (client-side filtering for search)
  const filteredSurveys = initialData.surveys.filter((survey) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      survey.email.toLowerCase().includes(query) ||
      survey.depositCity.toLowerCase().includes(query) ||
      survey.stageReached.toLowerCase().includes(query) ||
      survey.id.toLowerCase().includes(query)
    );
  });

  const { pagination } = initialData;

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
            Enquêtes ({pagination.total})
          </CardTitle>
          <CardDescription>
            Liste complète des enquêtes soumises - Page {currentPage} sur {pagination.totalPages}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Étape</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSurveys.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Aucune enquête trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSurveys.map((survey) => (
                    <TableRow
                      key={survey.id}
                      className="cursor-pointer"
                      onClick={() => router.push(`/admin/dashboard/surveys/${survey.id}`)}
                    >
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {survey.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell className="font-medium">{survey.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {survey.depositCity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStageBadgeColor(survey.stageReached)}
                        >
                          {survey.stageReached}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {new Date(survey.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Affichage de {((currentPage - 1) * pagination.limit) + 1} à{" "}
                {Math.min(currentPage * pagination.limit, pagination.total)} sur{" "}
                {pagination.total} résultats
              </p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          handlePageChange(currentPage - 1);
                        }
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {/* First page */}
                  {currentPage > 2 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                          }}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      {currentPage > 3 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                    </>
                  )}

                  {/* Current page and neighbors */}
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === currentPage ||
                        page === currentPage - 1 ||
                        page === currentPage + 1
                    )
                    .map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                  {/* Last page */}
                  {currentPage < pagination.totalPages - 1 && (
                    <>
                      {currentPage < pagination.totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pagination.totalPages);
                          }}
                        >
                          {pagination.totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < pagination.totalPages) {
                          handlePageChange(currentPage + 1);
                        }
                      }}
                      className={
                        currentPage === pagination.totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

