import { useEffect, useState } from "react";
import { useTheme } from "../../context/themecontext";

interface GitHubActivity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubHeatmapProps {
  username: string;
  year?: number;
}

// GitHub-style contribution calendar
// Shows coding activity over the year
export function GitHubHeatmap({ username, year = new Date().getFullYear() }: GitHubHeatmapProps) {
  const { isDark } = useTheme();
  const [activities, setActivities] = useState<GitHubActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    // Generate mock activity data for demonstration
    // In production, fetch from GitHub API or use github-contributions-api
    const generateMockData = () => {
      const data: GitHubActivity[] = [];
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      let total = 0;

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        // Random activity with realistic pattern (more activity on weekdays)
        const isWeekend = d.getDay() === 0 || d.getDay() === 6;
        const baseCount = isWeekend ? Math.random() * 3 : Math.random() * 10;
        const count = Math.floor(baseCount);
        const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4;

        total += count;
        data.push({
          date: d.toISOString().split("T")[0],
          count,
          level: level as 0 | 1 | 2 | 3 | 4,
        });
      }

      setTotalContributions(total);
      setActivities(data);
      setLoading(false);
    };

    generateMockData();
  }, [username, year]);

  // Colors based on activity level (GitHub-style)
  const getLevelColor = (level: number) => {
    if (isDark) {
      const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
      return colors[level];
    } else {
      const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
      return colors[level];
    }
  };

  // Group activities by week for calendar layout
  const weeks = [];
  const tempWeek = [];
  activities.forEach((activity, index) => {
    tempWeek.push(activity);
    if (tempWeek.length === 7) {
      weeks.push([...tempWeek]);
      tempWeek.length = 0;
    }
  });
  if (tempWeek.length > 0) weeks.push(tempWeek);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
          GitHub Activity
        </h3>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {totalContributions} contributions in {year}
        </p>
      </div>

      {/* Heatmap Calendar */}
      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={day.date}
                  className="group relative w-3 h-3 rounded-sm transition-all hover:ring-2 hover:ring-blue-500"
                  style={{ backgroundColor: getLevelColor(day.level) }}
                  title={`${day.count} contributions on ${day.date}`}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {day.count} contributions on {day.date}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 text-xs">
        <span className={isDark ? "text-gray-400" : "text-gray-600"}>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: getLevelColor(level) }}
          />
        ))}
        <span className={isDark ? "text-gray-400" : "text-gray-600"}>More</span>
      </div>
    </div>
  );
}
