import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "../../context/themecontext";
import { Play, RotateCcw, Code2, Table } from "lucide-react";
import initSqlJs, { Database } from "sql.js";

interface QueryResult {
  columns: string[];
  values: any[][];
}

interface PresetQuery {
  name: string;
  description: string;
  query: string;
}

// Interactive SQL playground with SQLite - Portfolio personnalisé
// Base de données avec mes technologies, projets et compétences
export function SQLPlayground() {
  const { isDark } = useTheme();
  const [db, setDb] = useState<Database | null>(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);

  // Requêtes personnalisées pour montrer mes compétences SQL
  const presetQueries: PresetQuery[] = [
    {
      name: "Ma Stack Préférée",
      description: "Technologies que j'utilise le plus, triées par niveau d'expertise",
      query: `SELECT
  t.name as technologie,
  t.category as categorie,
  t.proficiency_level as niveau_maitrise,
  COUNT(pt.project_id) as nombre_projets,
  GROUP_CONCAT(p.name, ', ') as projets_utilises
FROM technologies t
LEFT JOIN project_tech pt ON t.id = pt.tech_id
LEFT JOIN projects p ON pt.project_id = p.id
WHERE t.proficiency_level >= 80
GROUP BY t.id, t.name, t.category, t.proficiency_level
ORDER BY t.proficiency_level DESC, nombre_projets DESC;`,
    },
    {
      name: "Expertise BI & Data",
      description: "Mes compétences Business Intelligence et Data Analytics",
      query: `WITH bi_skills AS (
  SELECT
    name,
    proficiency_level,
    CASE
      WHEN proficiency_level >= 90 THEN 'Expert'
      WHEN proficiency_level >= 80 THEN 'Avancé'
      WHEN proficiency_level >= 70 THEN 'Intermédiaire'
      ELSE 'Débutant'
    END as niveau
  FROM technologies
  WHERE category IN ('BI', 'Data', 'Database')
)
SELECT
  niveau,
  GROUP_CONCAT(name, ', ') as competences,
  ROUND(AVG(proficiency_level), 1) as avg_proficiency
FROM bi_skills
GROUP BY niveau
ORDER BY avg_proficiency DESC;`,
    },
    {
      name: "Projets par Secteur",
      description: "Analyse de mes projets par secteur d'activité (Santé, Finance)",
      query: `SELECT
  p.sector as secteur,
  COUNT(*) as nombre_projets,
  GROUP_CONCAT(p.name, ' | ') as liste_projets,
  ROUND(AVG(p.complexity), 1) as complexite_moyenne,
  GROUP_CONCAT(DISTINCT t.category) as technologies_utilisees
FROM projects p
LEFT JOIN project_tech pt ON p.id = pt.project_id
LEFT JOIN technologies t ON pt.tech_id = t.id
GROUP BY p.sector
ORDER BY nombre_projets DESC;`,
    },
    {
      name: "Stack Full par Projet",
      description: "Technologies complètes utilisées dans chaque projet",
      query: `SELECT
  p.name as projet,
  p.sector as secteur,
  p.type as type_projet,
  GROUP_CONCAT(
    t.name || ' (' || t.category || ')',
    ', '
  ) as stack_complete,
  COUNT(DISTINCT t.id) as nb_technologies
FROM projects p
JOIN project_tech pt ON p.id = pt.project_id
JOIN technologies t ON pt.tech_id = t.id
GROUP BY p.id, p.name, p.sector, p.type
ORDER BY nb_technologies DESC;`,
    },
  ];

  // Initialisation SQLite avec mes vraies données
  useEffect(() => {
    const initDB = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: (file) => `https://sql.js.org/dist/${file}`,
        });

        const database = new SQL.Database();

        // Tables personnalisées avec mes vraies données
        database.run(`
          CREATE TABLE technologies (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            proficiency_level INTEGER
          );

          CREATE TABLE projects (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            sector TEXT NOT NULL,
            type TEXT NOT NULL,
            complexity INTEGER,
            description TEXT
          );

          CREATE TABLE project_tech (
            project_id INTEGER,
            tech_id INTEGER,
            is_primary INTEGER,
            PRIMARY KEY (project_id, tech_id)
          );

          INSERT INTO technologies VALUES (1, 'Power BI', 'BI', 90);
          INSERT INTO technologies VALUES (2, 'Python', 'Data', 85);
          INSERT INTO technologies VALUES (3, 'Pandas', 'Data', 85);
          INSERT INTO technologies VALUES (4, 'NumPy', 'Data', 82);
          INSERT INTO technologies VALUES (5, 'Scikit-learn', 'Data', 80);
          INSERT INTO technologies VALUES (6, 'PostgreSQL', 'Database', 90);
          INSERT INTO technologies VALUES (7, 'SQL Server', 'Database', 88);
          INSERT INTO technologies VALUES (8, 'MongoDB', 'Database', 75);
          INSERT INTO technologies VALUES (9, 'C#', 'Backend', 85);
          INSERT INTO technologies VALUES (10, 'ASP.NET Core', 'Backend', 85);
          INSERT INTO technologies VALUES (11, 'Entity Framework', 'Backend', 82);
          INSERT INTO technologies VALUES (12, 'Java', 'Backend', 80);
          INSERT INTO technologies VALUES (13, 'Spring Boot', 'Backend', 78);
          INSERT INTO technologies VALUES (14, 'Node.js', 'Backend', 75);
          INSERT INTO technologies VALUES (15, 'React', 'Frontend', 85);
          INSERT INTO technologies VALUES (16, 'TypeScript', 'Frontend', 88);
          INSERT INTO technologies VALUES (17, 'Docker', 'DevOps', 80);
          INSERT INTO technologies VALUES (18, 'Kubernetes', 'DevOps', 75);
          INSERT INTO technologies VALUES (19, 'Jenkins', 'DevOps', 72);
          INSERT INTO technologies VALUES (20, 'Terraform', 'DevOps', 70);

          INSERT INTO projects VALUES (1, 'MediTrack .NET', 'Santé', 'Application Web', 9, 'Système de gestion hospitalière avec ASP.NET Core 8');
          INSERT INTO projects VALUES (2, 'DataFin Predictor', 'Finance', 'Analytics Dashboard', 8, 'Dashboard analyse financière Python');
          INSERT INTO projects VALUES (3, 'BankFlow API', 'Finance', 'REST API', 8, 'API bancaire Java Spring Boot');

          INSERT INTO project_tech VALUES (1, 9, 1);
          INSERT INTO project_tech VALUES (1, 10, 1);
          INSERT INTO project_tech VALUES (1, 11, 1);
          INSERT INTO project_tech VALUES (1, 7, 1);
          INSERT INTO project_tech VALUES (1, 15, 0);
          INSERT INTO project_tech VALUES (1, 16, 0);
          INSERT INTO project_tech VALUES (1, 17, 0);
          INSERT INTO project_tech VALUES (2, 2, 1);
          INSERT INTO project_tech VALUES (2, 3, 1);
          INSERT INTO project_tech VALUES (2, 4, 1);
          INSERT INTO project_tech VALUES (2, 5, 1);
          INSERT INTO project_tech VALUES (2, 1, 0);
          INSERT INTO project_tech VALUES (2, 6, 0);
          INSERT INTO project_tech VALUES (3, 12, 1);
          INSERT INTO project_tech VALUES (3, 13, 1);
          INSERT INTO project_tech VALUES (3, 6, 1);
          INSERT INTO project_tech VALUES (3, 17, 0);
          INSERT INTO project_tech VALUES (3, 18, 0);

          CREATE INDEX idx_tech_category ON technologies(category);
          CREATE INDEX idx_project_sector ON projects(sector);
        `);

        setDb(database);
        setQuery(presetQueries[0].query);
        setLoading(false);
      } catch (err) {
        setError("Failed to initialize SQL engine");
        setLoading(false);
      }
    };

    initDB();
  }, []);

  // Execute SQL query
  const executeQuery = () => {
    if (!db || !query.trim()) return;

    setExecuting(true);
    setError("");
    setResult(null);

    try {
      const stmt = db.prepare(query);
      const results: QueryResult = {
        columns: stmt.getColumnNames(),
        values: [],
      };

      while (stmt.step()) {
        results.values.push(stmt.get());
      }

      stmt.free();
      setResult(results);
    } catch (err: any) {
      setError(err.message || "Query execution failed");
    } finally {
      setExecuting(false);
    }
  };

  // Reset database to initial state
  const resetDatabase = () => {
    setLoading(true);
    setResult(null);
    setError("");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Initializing SQL Engine...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Preset Queries */}
      <div className="flex gap-2 flex-wrap">
        {presetQueries.map((preset, index) => (
          <button
            key={index}
            onClick={() => setQuery(preset.query)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            title={preset.description}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Query Editor */}
      <div
        className={`rounded-lg overflow-hidden border ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <div
          className={`px-4 py-2 flex items-center justify-between ${
            isDark ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            <span className="text-sm font-medium">SQL Query Editor</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetDatabase}
              className={`p-2 rounded transition-colors ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
              title="Reset Database"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={executeQuery}
              disabled={executing || !query.trim()}
              className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors ${
                executing || !query.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <Play className="w-4 h-4" />
              {executing ? "Executing..." : "Run Query"}
            </button>
          </div>
        </div>

        {/* Query Input */}
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full p-4 font-mono text-sm resize-none focus:outline-none ${
            isDark
              ? "bg-gray-900 text-gray-100"
              : "bg-white text-gray-900"
          }`}
          rows={8}
          placeholder="Write your SQL query here..."
          spellCheck={false}
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50">
          <p className="text-red-500 text-sm font-medium">Error: {error}</p>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div
          className={`rounded-lg overflow-hidden border ${
            isDark ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <div
            className={`px-4 py-2 flex items-center gap-2 ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <Table className="w-4 h-4" />
            <span className="text-sm font-medium">
              Query Results ({result.values.length} rows)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                className={
                  isDark
                    ? "bg-gray-800 text-gray-300"
                    : "bg-gray-50 text-gray-700"
                }
              >
                <tr>
                  {result.columns.map((col, i) => (
                    <th
                      key={i}
                      className="px-4 py-2 text-left text-sm font-semibold"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
                className={isDark ? "text-gray-300" : "text-gray-700"}
              >
                {result.values.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      isDark
                        ? "border-t border-gray-700 hover:bg-gray-800/50"
                        : "border-t border-gray-200 hover:bg-gray-50"
                    }
                  >
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-2 text-sm">
                        {cell !== null ? String(cell) : "NULL"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Schema Info */}
      <div
        className={`p-4 rounded-lg text-sm ${
          isDark ? "bg-gray-800/50" : "bg-gray-50"
        }`}
      >
        <h4 className="font-semibold mb-2">📚 Schéma de la Base de Données</h4>
        <div className="space-y-1 text-xs">
          <p>
            <strong>technologies:</strong> id, name, category, proficiency_level
          </p>
          <p>
            <strong>projects:</strong> id, name, sector, type, complexity, description
          </p>
          <p>
            <strong>project_tech:</strong> project_id, tech_id, is_primary
          </p>
        </div>
      </div>
    </div>
  );
}
