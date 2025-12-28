import { useEffect, useState } from "react";
import { Code2, FolderGit2, Award, TrendingUp } from "lucide-react";
import { useTheme } from "../../context/themecontext";

interface Stat {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

// Live animated statistics for Hero section
// Displays key metrics with counter animation
export function LiveStats() {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const stats: Stat[] = [
    {
      icon: Code2,
      label: "GitHub Commits",
      value: 850,
      suffix: "+",
      color: "#3b82f6",
    },
    {
      icon: FolderGit2,
      label: "Projects",
      value: 12,
      suffix: "",
      color: "#8b5cf6",
    },
    {
      icon: Award,
      label: "Certifications",
      value: 5,
      suffix: "",
      color: "#ec4899",
    },
    {
      icon: TrendingUp,
      label: "Skills Mastered",
      value: 15,
      suffix: "+",
      color: "#f59e0b",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-12">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          stat={stat}
          index={index}
          isVisible={isVisible}
          isDark={isDark}
        />
      ))}
    </div>
  );
}

// Individual stat card with animation
function StatCard({
  stat,
  index,
  isVisible,
  isDark,
}: {
  stat: Stat;
  index: number;
  isVisible: boolean;
  isDark: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const Icon = stat.icon;

  // Animate counter
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setDisplayValue(stat.value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  return (
    <div
      className={`relative flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${
        isDark
          ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
          : "bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Icon with glow */}
      <div
        className="p-3 rounded-lg"
        style={{
          backgroundColor: `${stat.color}20`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color: stat.color }} />
      </div>

      {/* Label and value */}
      <div>
        <p
          className={`text-sm font-medium ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {stat.label}
        </p>
        <p
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {displayValue}
          {stat.suffix}
        </p>
      </div>
    </div>
  );
}
