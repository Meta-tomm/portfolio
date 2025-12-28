import { useEffect, useState } from "react";
import { useTheme } from "../../context/themecontext";
import { useAnalyticsStats, useLiveVisitors } from "../../hooks/useAnalytics";
import { useScrollAnimation } from "../../hooks/UseScrollAnimation";
import { KPICard } from "../data/KPICard";
import { InteractiveChart } from "../data/InteractiveChart";
import { Eye, Users, Clock, Activity } from "lucide-react";

interface AnalyticsData {
  overall: {
    totalPageViews: number;
    uniqueVisitors: number;
    avgDuration: number;
  };
  timeline: Array<{
    date: string;
    views: number;
    uniqueVisitors: number;
  }>;
  topProjects: Array<{
    projectId: string;
    views: number;
    uniqueVisitors: number;
  }>;
  pageDistribution: Array<{
    page: string;
    count: number;
  }>;
  deviceDistribution: Array<{
    device: string;
    count: number;
  }>;
}

// Analytics Dashboard - Harmonized with portfolio design system
export default function Analytics() {
  const [ref, isVisible] = useScrollAnimation();
  const { isDark } = useTheme();
  const { fetchStats } = useAnalyticsStats(30);
  const { fetchLiveVisitors } = useLiveVisitors();

  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [liveCount, setLiveCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch analytics data
  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      const data = await fetchStats();
      if (data) {
        setStats(data);
      }
      setLoading(false);
    };

    loadAnalytics();
  }, []);

  // Fetch live visitors every 30 seconds
  useEffect(() => {
    const updateLiveVisitors = async () => {
      const count = await fetchLiveVisitors();
      setLiveCount(count);
    };

    updateLiveVisitors();
    const interval = setInterval(updateLiveVisitors, 30000);

    return () => clearInterval(interval);
  }, []);

  // Project name mapping
  const projectNames: Record<string, string> = {
    'veille-techno': 'Veille Techno',
    'datafin-predictor': 'DataFin Predictor',
  };

  // LOADING STATE
  if (loading) {
    return (
      <section
        id="analytics"
        className={`relative min-h-screen flex items-center justify-center overflow-hidden py-20 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
              isDark ? "bg-blue-500" : "bg-blue-300"
            }`}
            style={{ top: "20%", left: "-10%" }}
          />
          <div
            className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
              isDark ? "bg-purple-500" : "bg-purple-300"
            }`}
            style={{ bottom: "20%", right: "-10%" }}
          />
        </div>

        <div
          className={`relative z-10 p-12 rounded-3xl max-w-md mx-6 text-center backdrop-blur-sm border shadow-2xl ${
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-white shadow-lg border-gray-100"
          }`}
        >
          <div className={`w-20 h-20 border-8 rounded-full animate-spin mx-auto mb-8 ${
            isDark
              ? "border-gray-700 border-t-blue-500"
              : "border-gray-200 border-t-blue-600"
          }`} />
          <h2 className={`text-3xl font-bold mb-3 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Chargement Analytics...
          </h2>
          <p className={`text-base ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            Récupération des données en cours
          </p>
        </div>
      </section>
    );
  }

  // Check if we have data
  const hasData = stats && (
    stats.overall.totalPageViews > 0 ||
    stats.timeline.length > 0 ||
    stats.topProjects.length > 0
  );

  // NO DATA STATE
  if (!hasData) {
    return (
      <section
        id="analytics"
        className={`relative min-h-screen flex items-center justify-center overflow-hidden py-20 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
              isDark ? "bg-blue-500" : "bg-blue-300"
            }`}
            style={{ top: "20%", left: "-10%" }}
          />
          <div
            className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
              isDark ? "bg-purple-500" : "bg-purple-300"
            }`}
            style={{ bottom: "20%", right: "-10%" }}
          />
        </div>

        <div
          className={`relative z-10 p-12 rounded-3xl max-w-lg mx-6 text-center backdrop-blur-sm border shadow-2xl ${
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-white shadow-lg border-gray-100"
          }`}
        >
          <div className="text-7xl mb-6">📊</div>
          <h2 className={`text-4xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Portfolio Analytics
          </h2>
          <p className={`text-lg mb-8 leading-relaxed ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            Aucune donnée disponible pour le moment.<br />
            Naviguez dans le portfolio pour générer des statistiques !
          </p>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl border-2 mb-5 ${
            isDark
              ? "bg-green-500/10 border-green-500/30"
              : "bg-green-50 border-green-200"
          }`}>
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className={`font-semibold text-sm ${
              isDark ? "text-green-400" : "text-green-700"
            }`}>
              Backend connecté • Tracking actif
            </span>
          </div>

          {/* Live Visitors */}
          <div className={`p-5 rounded-xl border-l-4 ${
            isDark
              ? "bg-blue-500/10 border-blue-500"
              : "bg-blue-50 border-blue-500"
          }`}>
            <p className={`text-sm ${
              isDark ? "text-blue-300" : "text-blue-900"
            }`}>
              <strong>Visiteurs en direct:</strong> {liveCount}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // WITH DATA - FULL DASHBOARD
  return (
    <section
      id="analytics"
      ref={ref}
      className={`relative min-h-screen py-20 transition-all duration-1000 overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`}
          style={{ top: "10%", right: "10%" }}
        />
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDark ? "bg-purple-500" : "bg-purple-300"
          }`}
          style={{ bottom: "10%", left: "10%" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
            isDark
              ? "from-blue-400 to-purple-400"
              : "from-blue-600 to-purple-600"
          }`}>
            Portfolio Analytics
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4" />
          <p className={`text-lg ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            Statistiques des 30 derniers jours
          </p>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            title="Pages Vues"
            value={stats.overall.totalPageViews}
            icon={Eye}
            color="#3b82f6"
            animationDelay={0}
          />
          <KPICard
            title="Visiteurs Uniques"
            value={stats.overall.uniqueVisitors}
            icon={Users}
            color="#8b5cf6"
            animationDelay={100}
          />
          <KPICard
            title="Temps Moyen"
            value={stats.overall.avgDuration}
            unit="sec"
            icon={Clock}
            color="#ec4899"
            animationDelay={200}
          />
          <KPICard
            title="En Direct"
            value={liveCount}
            icon={Activity}
            color="#10b981"
            animationDelay={300}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Timeline Chart */}
          <div className={`p-8 rounded-2xl backdrop-blur-sm border transition-all hover:shadow-2xl ${
            isDark
              ? "bg-white/5 border-white/10 hover:bg-white/10"
              : "bg-white shadow-lg border-gray-100 hover:shadow-xl"
          }`}>
            <InteractiveChart
              type="area"
              data={stats.timeline}
              dataKey="views"
              xAxisKey="date"
              title="Évolution des Visites"
              height={300}
            />
          </div>

          {/* Top Projects Chart */}
          <div className={`p-8 rounded-2xl backdrop-blur-sm border transition-all hover:shadow-2xl ${
            isDark
              ? "bg-white/5 border-white/10 hover:bg-white/10"
              : "bg-white shadow-lg border-gray-100 hover:shadow-xl"
          }`}>
            <InteractiveChart
              type="bar"
              data={stats.topProjects.map((p) => ({
                name: projectNames[p.projectId] || p.projectId,
                views: p.views,
              }))}
              dataKey="views"
              xAxisKey="name"
              title="Projets les Plus Consultés"
              height={300}
            />
          </div>

          {/* Page Distribution */}
          <div className={`p-8 rounded-2xl backdrop-blur-sm border transition-all hover:shadow-2xl ${
            isDark
              ? "bg-white/5 border-white/10 hover:bg-white/10"
              : "bg-white shadow-lg border-gray-100 hover:shadow-xl"
          }`}>
            <InteractiveChart
              type="pie"
              data={stats.pageDistribution.map((p) => ({
                name: p.page.charAt(0).toUpperCase() + p.page.slice(1),
                value: p.count,
              }))}
              dataKey="value"
              xAxisKey="name"
              title="Distribution par Page"
              height={300}
            />
          </div>

          {/* Device Distribution */}
          <div className={`p-8 rounded-2xl backdrop-blur-sm border transition-all hover:shadow-2xl ${
            isDark
              ? "bg-white/5 border-white/10 hover:bg-white/10"
              : "bg-white shadow-lg border-gray-100 hover:shadow-xl"
          }`}>
            <InteractiveChart
              type="pie"
              data={stats.deviceDistribution.map((d) => ({
                name: d.device.charAt(0).toUpperCase() + d.device.slice(1),
                value: d.count,
              }))}
              dataKey="value"
              xAxisKey="name"
              title="Types d'Appareils"
              height={300}
            />
          </div>
        </div>

        {/* Privacy Note */}
        <div className={`p-6 rounded-xl border-l-4 text-center ${
          isDark
            ? "bg-blue-500/10 border-blue-500"
            : "bg-blue-50 border-blue-500"
        }`}>
          <p className={`text-sm ${
            isDark ? "text-blue-300" : "text-blue-900"
          }`}>
            <strong>🔒 Privacy-First Analytics:</strong> Aucune adresse IP ni donnée personnelle stockée.
            Seuls des hash de session anonymes pour compter les visiteurs uniques.
          </p>
        </div>
      </div>
    </section>
  );
}
