import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// API base URL from env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Map route paths to analytics page names
const getPageName = (pathname: string): string => {
  if (pathname === '/') return 'home';
  if (pathname === '/admin') return 'admin';
  if (pathname.startsWith('/projects/')) return 'project-detail';
  // Sections accessed via hash (#skills, #about, etc.)
  return 'home';
};

// Extract project ID from URL
const getProjectId = (pathname: string): string | null => {
  const match = pathname.match(/^\/projects\/(.+)$/);
  return match ? match[1] : null;
};

// Track page view to backend
const trackPageView = async (page: string, projectId: string | null, duration: number = 0) => {
  try {
    await fetch(`${API_URL}/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
        projectId,
        referrer: document.referrer || 'direct',
        duration,
      }),
    });
  } catch (error) {
    // Silently fail - analytics shouldn't break the app
    console.debug('Analytics tracking failed:', error);
  }
};

// Custom hook to track analytics automatically
export function useAnalytics() {
  const location = useLocation();
  const pageStartTime = useRef<number>(Date.now());
  const lastPage = useRef<string>('');

  useEffect(() => {
    const currentPage = getPageName(location.pathname);
    const projectId = getProjectId(location.pathname);

    // Track page view on mount and route change
    if (currentPage !== lastPage.current) {
      // Calculate duration on previous page
      if (lastPage.current) {
        const duration = Math.floor((Date.now() - pageStartTime.current) / 1000);
        trackPageView(lastPage.current, null, duration);
      }

      // Track new page view
      trackPageView(currentPage, projectId);
      pageStartTime.current = Date.now();
      lastPage.current = currentPage;
    }

    // Track duration on page unload
    const handleBeforeUnload = () => {
      const duration = Math.floor((Date.now() - pageStartTime.current) / 1000);
      // Use navigator.sendBeacon for reliable tracking on page unload
      const data = JSON.stringify({
        page: currentPage,
        projectId,
        duration,
      });
      navigator.sendBeacon(`${API_URL}/analytics/track`, data);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);
}

// Hook to fetch analytics stats
export function useAnalyticsStats(days: number = 7) {
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/analytics/stats?days=${days}`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch analytics stats:', error);
      return null;
    }
  };

  return { fetchStats };
}

// Hook to fetch live visitors count
export function useLiveVisitors() {
  const fetchLiveVisitors = async () => {
    try {
      const response = await fetch(`${API_URL}/analytics/live`);
      if (!response.ok) throw new Error('Failed to fetch live visitors');
      const data = await response.json();
      return data.liveVisitors;
    } catch (error) {
      console.error('Failed to fetch live visitors:', error);
      return 0;
    }
  };

  return { fetchLiveVisitors };
}
