import { useState } from "react";
import { useTheme } from "../../context/themecontext";
import {
  MessageSquare,
  Brain,
  Target,
  Eye,
  Lightbulb,
  Users,
  Shield,
  Lock,
  Globe,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

interface SoftSkill {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  level: number;
  color: string;
  scenarios: {
    project: string;
    situation: string;
    action: string;
    result: string;
  }[];
}

// Composant interactif pour démontrer les soft skills avec exemples concrets
export function SoftSkillsShowcase() {
  const { isDark } = useTheme();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Soft skills optimisées pour Data Analyst BI (secteurs Santé & Finance)
  const softSkills: SoftSkill[] = [
    {
      id: "communication",
      name: "Communication",
      description:
        "Capacité à expliquer des insights complexes de manière claire et accessible aux stakeholders non-techniques",
      icon: MessageSquare,
      level: 90,
      color: "#3b82f6",
      scenarios: [
        {
          project: "MediTrack .NET",
          situation:
            "Présentation des KPIs hospitaliers au comité de direction (non-techniques)",
          action:
            "Création de dashboards visuels Power BI avec storytelling data-driven, évitant le jargon technique",
          result:
            "Adoption immédiate des nouveaux KPIs, augmentation de 40% de l'utilisation des dashboards",
        },
        {
          project: "DataFin Predictor",
          situation:
            "Expliquer les anomalies détectées dans les flux financiers à l'équipe comptable",
          action:
            "Documentation détaillée avec visualisations et exemples concrets, sessions de formation",
          result:
            "Réduction de 60% du temps de validation des anomalies par l'équipe métier",
        },
      ],
    },
    {
      id: "analytical-thinking",
      name: "Pensée Analytique",
      description:
        "Capacité à décomposer des problèmes complexes, identifier les patterns et proposer des solutions data-driven",
      icon: Brain,
      level: 95,
      color: "#8b5cf6",
      scenarios: [
        {
          project: "BankFlow API",
          situation:
            "Performance dégradée des requêtes SQL sur la base de transactions (>5M lignes)",
          action:
            "Analyse des query plans, identification des index manquants, optimisation des jointures",
          result:
            "Réduction du temps de réponse de 12s à 0.8s (93% plus rapide)",
        },
        {
          project: "DataFin Predictor",
          situation:
            "Faible précision des prévisions de trésorerie (65%)",
          action:
            "Analyse statistique des features, test de 5 algorithmes différents (ARIMA, Prophet, LSTM)",
          result:
            "Amélioration de la précision à 87% avec modèle hybride",
        },
      ],
    },
    {
      id: "problem-solving",
      name: "Résolution de Problèmes",
      description:
        "Approche méthodique pour identifier les causes racines et implémenter des solutions efficaces",
      icon: Target,
      level: 88,
      color: "#ec4899",
      scenarios: [
        {
          project: "MediTrack .NET",
          situation:
            "Doublons dans les données patients causant des erreurs de facturation",
          action:
            "Développement d'un algorithme de déduplication avec scoring de similarité (Levenshtein distance)",
          result:
            "Détection et fusion de 2,400 doublons, zéro erreur de facturation depuis 6 mois",
        },
      ],
    },
    {
      id: "attention-to-detail",
      name: "Attention aux Détails",
      description:
        "Rigueur dans la validation des données, détection d'anomalies et qualité du code",
      icon: Eye,
      level: 92,
      color: "#10b981",
      scenarios: [
        {
          project: "BankFlow API",
          situation:
            "Validation des transactions bancaires critiques (secteur finance)",
          action:
            "Implémentation de 15 règles de validation, tests unitaires à 95% de couverture, logging détaillé",
          result:
            "Zéro transaction invalide en production, conformité audit réussie",
        },
      ],
    },
    {
      id: "continuous-learning",
      name: "Apprentissage Continu",
      description:
        "Curiosité et proactivité dans l'apprentissage de nouvelles technologies et méthodologies",
      icon: Lightbulb,
      level: 90,
      color: "#f59e0b",
      scenarios: [
        {
          project: "Transition BI Analytics",
          situation:
            "Besoin de compétences avancées en Power BI et Python pour alternance",
          action:
            "Auto-formation intensive : certifications Power BI, cours Pandas/NumPy, projets personnels",
          result:
            "Maîtrise Power BI (90%), Python Data (85%), obtention alternance ciblée",
        },
      ],
    },
    {
      id: "teamwork",
      name: "Travail d'Équipe",
      description:
        "Collaboration efficace avec équipes techniques et métier, partage de connaissances",
      icon: Users,
      level: 85,
      color: "#06b6d4",
      scenarios: [
        {
          project: "MediTrack .NET",
          situation:
            "Coordination entre équipe dev, DBA et personnel médical",
          action:
            "Sprints agiles, daily standups, documentation partagée, sessions de pair programming",
          result:
            "Livraison à temps, satisfaction équipe 4.5/5, zéro conflit technique",
        },
      ],
    },
    {
      id: "ethics",
      name: "Éthique Professionnelle",
      description:
        "Intégrité dans le traitement des données et respect des normes professionnelles",
      icon: Shield,
      level: 95,
      color: "#84cc16",
      scenarios: [
        {
          project: "MediTrack .NET (Santé)",
          situation:
            "Accès aux données médicales sensibles (RGPD, secret médical)",
          action:
            "Chiffrement des données au repos et en transit, logs d'accès, formation RGPD",
          result:
            "Conformité RGPD validée, audit sécurité réussi, zéro incident",
        },
      ],
    },
    {
      id: "confidentiality",
      name: "Confidentialité",
      description:
        "Gestion rigoureuse des données sensibles (santé, finance) selon les normes RGPD",
      icon: Lock,
      level: 95,
      color: "#ef4444",
      scenarios: [
        {
          project: "BankFlow API (Finance)",
          situation:
            "Manipulation de données bancaires et transactions financières",
          action:
            "Hashage des données sensibles, accès basé sur les rôles (RBAC), rotation des secrets",
          result:
            "Certification PCI-DSS Level 1, zéro fuite de données",
        },
      ],
    },
    {
      id: "adaptability",
      name: "Adaptabilité",
      description:
        "Flexibilité face aux changements de priorités et nouvelles technologies",
      icon: TrendingUp,
      level: 87,
      color: "#a855f7",
      scenarios: [
        {
          project: "Pivot Tech Stack",
          situation:
            "Changement de stack : PHP Symfony → .NET + Python Data Analytics",
          action:
            "Apprentissage rapide C#/ASP.NET Core, migration progressive, documentation",
          result:
            "Maîtrise .NET en 3 mois, premier projet livré avec succès",
        },
      ],
    },
    {
      id: "english",
      name: "Anglais Professionnel",
      description:
        "Capacité à travailler dans un environnement international (documentation, communication)",
      icon: Globe,
      level: 80,
      color: "#14b8a6",
      scenarios: [
        {
          project: "Documentation Technique",
          situation:
            "Rédaction de documentation technique pour équipe internationale",
          action:
            "Documentation complète en anglais (API docs, README, architecture decisions)",
          result:
            "Adoption par 3 équipes internationales, contribution open-source",
        },
      ],
    },
  ];

  const selected = softSkills.find((s) => s.id === selectedSkill);

  return (
    <div className="space-y-6">
      {/* Titre section */}
      <div className="text-center mb-8">
        <h3
          className={`text-2xl font-bold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Soft Skills - Approche Data-Driven
        </h3>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Cliquez sur une compétence pour voir des exemples concrets d'application
        </p>
      </div>

      {/* Grille des soft skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {softSkills.map((skill) => {
          const Icon = skill.icon;
          const isSelected = selectedSkill === skill.id;

          return (
            <button
              key={skill.id}
              onClick={() =>
                setSelectedSkill(isSelected ? null : skill.id)
              }
              className={`p-4 rounded-xl text-left transition-all ${
                isDark
                  ? isSelected
                    ? "bg-gray-700 border-2 border-blue-500"
                    : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                  : isSelected
                  ? "bg-white border-2 border-blue-500 shadow-lg"
                  : "bg-gray-50 hover:bg-white border border-gray-200 hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${skill.color}20` }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: skill.color }}
                  />
                </div>
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${
                    isSelected ? "rotate-90" : ""
                  } ${isDark ? "text-gray-400" : "text-gray-500"}`}
                />
              </div>

              <h4
                className={`font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {skill.name}
              </h4>

              {/* Barre de niveau */}
              <div className="mb-2">
                <div
                  className={`h-2 rounded-full ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${skill.level}%`,
                      backgroundColor: skill.color,
                    }}
                  />
                </div>
                <span
                  className={`text-xs mt-1 inline-block ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {skill.level}%
                </span>
              </div>

              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {skill.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Détails du skill sélectionné */}
      {selected && (
        <div
          className={`mt-6 p-6 rounded-xl border-2 ${
            isDark
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
          style={{ borderColor: selected.color }}
        >
          <h4
            className={`text-xl font-bold mb-4 flex items-center gap-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {(() => {
              const Icon = selected.icon;
              return <Icon className="w-6 h-6" style={{ color: selected.color }} />;
            })()}
            {selected.name} - Exemples Concrets
          </h4>

          <div className="space-y-4">
            {selected.scenarios.map((scenario, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  isDark ? "bg-gray-700/50" : "bg-gray-50"
                }`}
              >
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                  style={{
                    backgroundColor: `${selected.color}20`,
                    color: selected.color,
                  }}
                >
                  {scenario.project}
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span
                      className={`font-semibold ${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      Situation:
                    </span>{" "}
                    <span
                      className={
                        isDark ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      {scenario.situation}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`font-semibold ${
                        isDark ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      Action:
                    </span>{" "}
                    <span
                      className={
                        isDark ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      {scenario.action}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`font-semibold ${
                        isDark ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      Résultat:
                    </span>{" "}
                    <span
                      className={
                        isDark ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      {scenario.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
