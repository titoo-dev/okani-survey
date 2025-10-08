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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Download, Filter, X, BarChart3, Users, FileText } from "lucide-react";
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

const COLORS = {
  chart1: "hsl(var(--chart-1))",
  chart2: "hsl(var(--chart-2))",
  chart3: "hsl(var(--chart-3))",
  chart4: "hsl(var(--chart-4))",
  chart5: "hsl(var(--chart-5))",
  statInfo: "hsl(var(--stat-info))",
  statSuccess: "hsl(var(--stat-success))",
  statWarning: "hsl(var(--stat-warning))",
};

const PIE_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--stat-warning))",
];

type DashboardClientProps = {
  initialData: DashboardData;
  initialFilters: DashboardFilters;
};

export function DashboardClient({
  initialData,
  initialFilters,
}: DashboardClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isExporting, setIsExporting] = useState(false);

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
      router.push(`/admin/dashboard?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    setFilters({});
    startTransition(() => {
      router.push("/admin/dashboard");
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

  const hasActiveFilters = filters.city || filters.stage;

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground">
            Statistiques des enquêtes Okani Survey
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
              <CardTitle>Filtres</CardTitle>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Effacer les filtres
              </Button>
            )}
          </div>
          <CardDescription>
            Filtrez les données par ville et étape
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
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

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-stat-info">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total des enquêtes
            </CardTitle>
            <div className="rounded-full bg-stat-info/10 p-2">
              <FileText className="h-4 w-4 text-stat-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-stat-info">
              {initialData.totalSurveys}
            </div>
            <p className="text-xs text-muted-foreground">
              Enquêtes soumises
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-stat-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Villes</CardTitle>
            <div className="rounded-full bg-stat-success/10 p-2">
              <BarChart3 className="h-4 w-4 text-stat-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-stat-success">
              {initialData.citiesStats.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Villes couvertes
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-stat-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Étapes suivies
            </CardTitle>
            <div className="rounded-full bg-stat-warning/10 p-2">
              <Users className="h-4 w-4 text-stat-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-stat-warning">
              {initialData.stagesStats.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Étapes différentes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Cities Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Enquêtes par ville</CardTitle>
            <CardDescription>
              Distribution des enquêtes selon les villes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                Libreville: {
                  label: "Libreville",
                  color: "hsl(var(--chart-1))",
                },
                Lambaréné: {
                  label: "Lambaréné",
                  color: "hsl(var(--chart-2))",
                },
                Mouila: {
                  label: "Mouila",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={initialData.citiesStats}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="city"
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {initialData.citiesStats.map((entry, index) => (
                    <Cell 
                      key={`cell-${entry.city}`}
                      fill={
                        entry.city === "Libreville" ? COLORS.chart1 :
                        entry.city === "Lambaréné" ? COLORS.chart2 :
                        COLORS.chart3
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Stages Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Enquêtes par étape</CardTitle>
            <CardDescription>
              Répartition des enquêtes selon l'étape atteinte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                "Dépôt de dossier": {
                  label: "Dépôt",
                  color: "hsl(var(--chart-1))",
                },
                "Enquête foncière": {
                  label: "Enquête",
                  color: "hsl(var(--chart-2))",
                },
                "Avis d'affichage": {
                  label: "Affichage",
                  color: "hsl(var(--chart-3))",
                },
                "PV et plan de bornage": {
                  label: "Bornage",
                  color: "hsl(var(--chart-4))",
                },
                "Rapport d'évaluation": {
                  label: "Évaluation",
                  color: "hsl(var(--chart-5))",
                },
                "Décision": {
                  label: "Décision",
                  color: "hsl(var(--stat-warning))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={initialData.stagesStats}
                    dataKey="count"
                    nameKey="stage"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={2}
                    label={(entry) => `${entry.count}`}
                  >
                    {initialData.stagesStats.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.stage}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={<ChartTooltipContent hideLabel />} 
                  />
                  <ChartLegend 
                    content={<ChartLegendContent />}
                    verticalAlign="bottom"
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Satisfaction Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Satisfaction par étape</CardTitle>
          <CardDescription>
            Score de satisfaction moyen pour chaque étape (sur 5)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              average: {
                label: "Satisfaction moyenne",
                color: "hsl(var(--stat-success))",
              },
            }}
            className="h-[300px]"
          >
            <LineChart data={initialData.satisfactionByStage}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="stage"
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.statSuccess} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={COLORS.statSuccess} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="average"
                stroke={COLORS.statSuccess}
                strokeWidth={3}
                dot={{ 
                  fill: COLORS.statSuccess, 
                  strokeWidth: 2, 
                  r: 5,
                  stroke: "hsl(var(--background))"
                }}
                activeDot={{ r: 7 }}
                fill="url(#colorAverage)"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Recent Surveys Table */}
      <Card>
        <CardHeader>
          <CardTitle>Enquêtes récentes</CardTitle>
          <CardDescription>
            Les 10 dernières enquêtes soumises
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left font-medium">Email</th>
                  <th className="pb-3 text-left font-medium">Ville</th>
                  <th className="pb-3 text-left font-medium">Étape</th>
                  <th className="pb-3 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {initialData.recentSurveys.map((survey) => (
                  <tr key={survey.id} className="border-b">
                    <td className="py-3">{survey.email}</td>
                    <td className="py-3">{survey.depositCity}</td>
                    <td className="py-3">{survey.stageReached}</td>
                    <td className="py-3">
                      {new Date(survey.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

