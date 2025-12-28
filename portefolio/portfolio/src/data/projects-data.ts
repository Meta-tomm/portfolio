// Centralized project data with metrics and visualizations config
// Used across project pages for consistency

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  status: "completed" | "in-progress" | "academic";
  github?: string;
  demo?: string;
  gradient: string;

  // KPIs for project dashboard
  kpis: {
    label: string;
    value: number | string;
    unit?: string;
    trend?: {
      value: number;
      isPositive: boolean;
    };
  }[];

  // Visualization data
  charts?: {
    type: "line" | "bar" | "area" | "pie" | "radar";
    title: string;
    data: any[];
    dataKey: string;
    xAxisKey?: string;
  }[];

  // Power BI config
  powerBI?: {
    embedUrl?: string;
    reportId?: string;
    fallbackImage?: string;
  };

  // Code highlights
  codeSnippets?: {
    language: string;
    code: string;
    description: string;
  }[];

  // Architecture diagram
  architecture?: {
    image?: string;
    description: string;
  };
}

export const projectsData: ProjectData[] = [
  {
    id: "veille-techno",
    title: "Veille Technologique Automatisee",
    subtitle: "Pipeline ETL + Dashboard Power BI",
    description:
      "Systeme automatise de veille technologique avec scraping d'articles, analyse de sentiments et dashboard interactif Power BI. Pipeline Python orchestré avec scheduling automatique.",
    tags: ["Python", "Power BI", "ETL", "Pandas", "BeautifulSoup", "SQL"],
    status: "in-progress",
    gradient: "from-blue-600 to-cyan-500",
    kpis: [
      {
        label: "Articles Analyses",
        value: 500,
        unit: "+",
        trend: { value: 15, isPositive: true },
      },
      {
        label: "Sources Suivies",
        value: 12,
        unit: "sites",
      },
      {
        label: "Temps Economise",
        value: "90min",
        unit: "/jour",
      },
      {
        label: "Precision Filtrage",
        value: 92,
        unit: "%",
        trend: { value: 8, isPositive: true },
      },
    ],
    charts: [
      {
        type: "line",
        title: "Articles collectés par jour",
        data: [
          { date: "Lun", articles: 45 },
          { date: "Mar", articles: 52 },
          { date: "Mer", articles: 48 },
          { date: "Jeu", articles: 61 },
          { date: "Ven", articles: 55 },
          { date: "Sam", articles: 32 },
          { date: "Dim", articles: 28 },
        ],
        dataKey: "articles",
        xAxisKey: "date",
      },
      {
        type: "bar",
        title: "Répartition par source",
        data: [
          { source: "TechCrunch", count: 120 },
          { source: "Medium", count: 95 },
          { source: "Dev.to", count: 85 },
          { source: "Hacker News", count: 110 },
          { source: "Reddit", count: 90 },
        ],
        dataKey: "count",
        xAxisKey: "source",
      },
    ],
    powerBI: {
      fallbackImage: "/projects/veille-techno/dashboard-preview.png",
    },
    codeSnippets: [
      {
        language: "python",
        description: "Pipeline ETL principal",
        code: `import pandas as pd
from bs4 import BeautifulSoup
import requests

def extract_articles(sources):
    """Extract articles from multiple tech sources"""
    articles = []
    for source in sources:
        response = requests.get(source['url'])
        soup = BeautifulSoup(response.content, 'html.parser')

        for article in soup.find_all(source['selector']):
            articles.append({
                'title': article.get_text(),
                'url': article.get('href'),
                'source': source['name'],
                'date': pd.Timestamp.now()
            })

    return pd.DataFrame(articles)

def transform_data(df):
    """Clean and enrich article data"""
    df['title_clean'] = df['title'].str.strip()
    df['category'] = df['title'].apply(categorize_article)
    df['sentiment'] = df['title'].apply(analyze_sentiment)
    return df

def load_to_database(df, conn):
    """Load processed articles to SQL database"""
    df.to_sql('articles', conn, if_exists='append', index=False)`,
      },
      {
        language: "sql",
        description: "Requête d'analyse des tendances",
        code: `WITH daily_stats AS (
  SELECT
    DATE(date) as article_date,
    category,
    COUNT(*) as article_count,
    AVG(sentiment) as avg_sentiment
  FROM articles
  WHERE date >= DATE('now', '-30 days')
  GROUP BY article_date, category
)
SELECT
  article_date,
  category,
  article_count,
  ROUND(avg_sentiment, 2) as sentiment_score,
  SUM(article_count) OVER (
    PARTITION BY category
    ORDER BY article_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) as rolling_7day_total
FROM daily_stats
ORDER BY article_date DESC, article_count DESC;`,
      },
    ],
    architecture: {
      description:
        "Architecture ETL avec scraping, transformation et chargement vers base SQL + Power BI",
    },
  },
  {
    id: "datafin-predictor",
    title: "DataFin Predictor",
    subtitle: "Dashboard Financier avec Python",
    description:
      "Dashboard d'analyse financière avec scripts Python pour prévisions et détection d'anomalies. Pipeline ETL avec Pandas, analyse statistique avec NumPy/SciPy, et visualisations interactives.",
    tags: ["Python", "Pandas", "NumPy", "Data Analysis", "ETL"],
    status: "academic",
    github: "https://github.com/Meta-tomm/DataFin",
    gradient: "from-orange-600 to-red-500",
    architecture: {
      description:
        "Architecture ETL Python : extraction CSV → transformation Pandas → analyse statistique NumPy/SciPy → export JSON pour dashboard React",
    },
  },
];
