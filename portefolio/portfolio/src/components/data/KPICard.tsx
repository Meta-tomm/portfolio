import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import { useTheme } from "../../context/themecontext";

interface KPICardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
  animationDelay?: number;
}

// KPI Card with animated counter and trend indicator
// Used in project pages to display key metrics
export function KPICard({
  title,
  value,
  unit = "",
  icon: Icon,
  trend,
  color = "#3b82f6",
  animationDelay = 0,
}: KPICardProps) {
  const { isDark } = useTheme();
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animate counter from 0 to target value
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), animationDelay);
    return () => clearTimeout(timer);
  }, [animationDelay]);

  useEffect(() => {
    if (!isVisible || typeof value !== "number") return;

    const duration = 1500; // Animation duration in ms
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  const formattedValue = typeof value === "number" ? displayValue : value;

  return (
    <div
      className={`relative p-6 rounded-xl transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${
        isDark
          ? "bg-gray-800/50 border border-gray-700"
          : "bg-white border border-gray-200"
      } hover:shadow-xl hover:scale-105`}
    >
      {/* Background gradient glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-10"
        style={{
          background: `radial-gradient(circle at top right, ${color}, transparent)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon with color accent */}
        <div className="flex items-center justify-between mb-3">
          <div
            className="p-3 rounded-lg"
            style={{
              backgroundColor: `${color}20`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>

          {/* Trend indicator */}
          {trend && (
            <div
              className={`flex items-center gap-1 text-sm font-semibold ${
                trend.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {/* Title */}
        <p
          className={`text-sm font-medium mb-2 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {title}
        </p>

        {/* Value */}
        <div className="flex items-baseline gap-1">
          <span
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {formattedValue}
          </span>
          {unit && (
            <span
              className={`text-lg font-medium ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
