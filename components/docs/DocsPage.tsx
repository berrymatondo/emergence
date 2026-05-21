"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Download,
  FileText,
  BookOpen,
  BarChart2,
  TrendingUp,
  Building2,
  Shield,
  Layers,
  DollarSign,
  Globe,
  Lock,
  Settings,
  Monitor,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type SubItem = {
  title: string;
  route: string;
  description: string;
  icon?: React.ReactNode;
};

type DocSection = {
  id: string;
  title: string;
  navTitle: string;
  route: string;
  category: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  badge?: string;
  business: string;
  technical: string;
  features: string[];
  subItems?: SubItem[];
};

// ─── Documentation Sections ───────────────────────────────────────────────────

const docSections: DocSection[] = [
  {
    id: "intro",
    title: "Aperçu de la Plateforme",
    navTitle: "Aperçu",
    route: "/",
    category: "Général",
    icon: <Monitor size={18} />,
    iconColor: "text-teal-400",
    iconBg: "bg-teal-400/10",
    business: `Convergence est une plateforme souveraine d'analyse financière dédiée à la gestion, l'optimisation et la valorisation de la dette publique de la République Démocratique du Congo et des marchés émergents. Elle centralise des outils de pricing avancés, d'analyse de durabilité de la dette et de modélisation macro-économique.

Utilisateurs cibles :
• Gestionnaires de dette du Ministère des Finances
• Analystes financiers de la Banque Centrale du Congo (BCC)
• Équipes de trésorerie souveraine
• Consultants en marchés émergents

Objectifs métier :
• Centraliser l'analyse et la valorisation des instruments de dette souveraine
• Fournir des outils de pricing conformes aux standards internationaux
• Permettre la simulation de scénarios de stress et l'analyse de durabilité
• Optimiser les décisions d'emprunt et de refinancement souverain`,
    technical: `Stack : Next.js 14.2.5 (App Router), React 18, TypeScript 5
Base de données : PostgreSQL + Prisma ORM 5.17.0 (22 modèles)
Authentification : NextAuth 5.0.0-beta.19, provider Credentials, sessions JWT
UI : Shadcn/ui (Radix UI) + Tailwind CSS 3.4.1
Graphiques : Recharts 2.13.0
Validation : Zod 3.23.8 + React Hook Form 7.52.1
Export : XLSX 0.20.3, jsPDF

Architecture : Monolithe full-stack Next.js avec Server Components, Server Actions et API Routes NextAuth. Middleware de protection des routes.`,
    features: [
      "Tableau de bord macro-économique temps réel",
      "Valorisation multi-produits (obligations, options, swaps)",
      "Analyse de durabilité de la dette souveraine",
      "Gestion des courbes de taux et données de marché",
      "Modélisation de scénarios macro-économiques",
      "Administration des utilisateurs et référentiels",
      "Export Excel et génération de rapports PDF",
      "Thème clair/sombre natif",
    ],
    subItems: [
      {
        title: "Interface principale",
        route: "/overview",
        description: "Dashboard & navigation générale",
        icon: <BarChart2 size={24} />,
      },
      {
        title: "Statistiques & Indicateurs",
        route: "/overview",
        description: "Données macroéconomiques par pays",
        icon: <TrendingUp size={24} />,
      },
      {
        title: "Vue données financières",
        route: "/valorisation",
        description: "Instruments de valorisation",
        icon: <DollarSign size={24} />,
      },
      {
        title: "Gestion de la dette",
        route: "/anadette",
        description: "Analyse et optimisation de la dette",
        icon: <Layers size={24} />,
      },
    ],
  },
  {
    id: "auth",
    title: "Authentification",
    navTitle: "Authentification",
    route: "/auth/login",
    category: "Accès",
    icon: <Lock size={18} />,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-400/10",
    business: `Module d'accès sécurisé à la plateforme. L'authentification protège l'ensemble des données financières sensibles et garantit que seuls les utilisateurs autorisés accèdent aux outils de valorisation et d'analyse.

Parcours utilisateur :
1. Inscription (/auth/register) : Création d'un compte avec email, nom d'utilisateur et mot de passe (min. 6 caractères). Le compte est créé INACTIF et doit être activé par un administrateur.
2. Connexion (/auth/login) : Saisie du nom d'utilisateur et du mot de passe. En cas de succès, redirection vers /overview.

Rôles et permissions :
• AGENT : Accès à tous les modules de valorisation, d'analyse et de consultation
• ADMIN : Accès complet incluant gestion des utilisateurs, pays, matrices et lots

Statuts :
• ACTIF : Compte activé, accès autorisé
• INACTIF : Compte suspendu ou en attente d'activation`,
    technical: `Provider : NextAuth Credentials (username + password)
Hashage : bcryptjs (salt auto-généré)
Sessions : JWT (JSON Web Token) côté serveur
Configuration : auth.ts (callbacks session/jwt, fonction authorize)
Middleware : middleware.ts — protection de /overview/* et /valorisation/*

Validation Zod :
  RegisterSchema : email, username, password (min 6), passwordConfirmation
  LoginSchema : username, password

Routes publiques : /, /auth/login, /auth/register
Routes protégées : /overview, /valorisation/*, /anadette/*, /banque/*, /financingCapacity, /admin/*`,
    features: [
      "Connexion sécurisée par identifiant + mot de passe",
      "Inscription avec validation des champs (Zod)",
      "Gestion des rôles AGENT et ADMIN",
      "Protection automatique des routes par middleware Next.js",
      "Sessions JWT persistantes avec expiration",
      "Déconnexion sécurisée via /redirout",
    ],
    subItems: [
      { title: "Connexion", route: "/auth/login", description: "Authentification par identifiant et mot de passe", icon: <Lock size={24} /> },
      { title: "Inscription", route: "/auth/register", description: "Création de compte utilisateur avec validation", icon: <Shield size={24} /> },
    ],
  },
  {
    id: "overview",
    title: "Dashboard / Overview",
    navTitle: "Dashboard",
    route: "/overview",
    category: "Tableau de bord",
    icon: <BarChart2 size={18} />,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10",
    business: `Page d'accueil principale après connexion. Fournit une vue synthétique de la situation macro-économique de la RDC : indicateurs clés, courbes de taux souverains, taux de change et taux directeurs de la BCC.

Indicateurs affichés :
• Courbes de rendement souverains (tenor vs yield)
• Taux de change USD/CDF et EUR/CDF
• Taux directeurs BCC (Banque Centrale du Congo)
• KPIs personnalisés (croissance, dette/PIB, etc.)

Usage métier : Première lecture quotidienne pour les gestionnaires de dette afin d'évaluer rapidement les conditions de marché avant de procéder à des valorisations ou analyses.`,
    technical: `Type : Page serveur Next.js (SSR)
Actions serveur :
  getAllOverview()         → KPIs de la table Overview
  getAllYC(true, 1, date)  → courbes de taux pays
  getAllFXR()              → taux de change FX
  getAllBCCIntRates()      → taux directeurs BCC

Composant principal : components/overview/overV.tsx
Graphiques : Recharts (LineChart, AreaChart, ResponsiveContainer)
Modèles Prisma : Overview, YieldCurve, FXRates, BCCIntRates`,
    features: [
      "Courbes de taux souverains interactives (Recharts)",
      "Indicateurs FX temps réel (USD/CDF, EUR/CDF)",
      "Taux directeurs BCC historiques",
      "KPIs macro-économiques configurables",
      "Rendu côté serveur (SSR) pour des données fraîches",
    ],
  },
  {
    id: "valorisation",
    title: "Obligations (Bonds)",
    navTitle: "Obligations (Bonds)",
    route: "/valorisation",
    category: "Valorisation",
    icon: <TrendingUp size={18} />,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
    badge: "Core",
    business: `Module central de pricing des instruments obligataires souverains. Couvre l'ensemble des produits obligataires utilisés dans la gestion de la dette publique.

Types d'obligations supportées :
1. Straight / Amortized Bond — Obligation à taux fixe, avec ou sans amortissement
2. Floating Rate Bond (FRN) — Obligation à taux variable
3. Step-Up Coupon Bond — Obligation à coupons progressifs croissants
4. Dual Currency Bond — Instrument libellé dans deux devises distinctes
5. Commodity-Linked Bond — Coupon indexé sur un prix de matière première

Cas d'usage métier :
• Évaluer le coût d'un emprunt obligataire souverain avant émission
• Calculer la duration et le risque de taux d'un portefeuille
• Projeter les cashflows et construire la courbe des remboursements
• Comparer différentes structures de financement`,
    technical: `Route principale : /valorisation
Validation Zod : StraightSchema, ASBSchema, FloatingSchema, StepUpSchema, SBSchema, CommoSchema
Actions serveur : lib/_sbActions.ts, _floatingActions.ts, _stepActions.ts, _dualActions.ts, _commoActions.ts, _asbActions.ts

Paramètres communs :
  price, bondMaturityDate, issueDate, firstCouponDate
  couponCurrency, couponRate, couponFrequency (1-12)
  couponBasis (AA/A0/A5), valuationDate, notional
  curveType (zcc/yic/inc), liquidityPremium
  defaultCountry, label, forcedBondPrice (optionnel)`,
    features: [
      "Sélecteur de produit intuitif",
      "Formulaires validés en temps réel (Zod + React Hook Form)",
      "Calcul du prix obligataire, duration modifiée, convexité",
      "Projection des cashflows et courbes actuarielles",
      "Support multi-devises : USD, EUR, CDF",
      "3 types de courbes : zero-coupon, yield, implied spread",
    ],
    subItems: [
      { title: "Straight / Amortized Bond", route: "/valorisation/simple", description: "Obligation à taux fixe avec ou sans calendrier d'amortissement", icon: <TrendingUp size={24} /> },
      { title: "Floating Rate Bond", route: "/valorisation/frb", description: "Obligation à taux variable référencé sur une courbe de taux", icon: <TrendingUp size={24} /> },
      { title: "Step-Up Coupon Bond", route: "/valorisation/stepup", description: "Obligation à coupons progressifs définis par un calendrier", icon: <TrendingUp size={24} /> },
      { title: "Dual Currency Bond", route: "/valorisation/dual", description: "Instrument libellé dans deux devises avec courbes distinctes", icon: <TrendingUp size={24} /> },
      { title: "Commodity-Linked Bond", route: "/valorisation/commo", description: "Coupon indexé sur un prix de matière première sous-jacente", icon: <TrendingUp size={24} /> },
      { title: "Options (European / American)", route: "/valorisation/options", description: "Pricing options call/put via Black-Scholes, Monte Carlo, Binomial", icon: <TrendingUp size={24} /> },
    ],
  },
  {
    id: "anadette",
    title: "Analyse de Dette",
    navTitle: "Analyse de Dette",
    route: "/anadette",
    category: "Analyse",
    icon: <DollarSign size={18} />,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-400/10",
    business: `Module dédié à l'analyse stratégique de la dette souveraine. Permet d'évaluer, comparer et optimiser les options de financement, d'analyser la durabilité de la dette et de modéliser des scénarios macro-économiques.

Métriques calculées automatiquement :
• Prix obligataire (bondPrice) — juste valeur de l'instrument
• Duration (CMA) — sensibilité aux variations de taux
• Probabilité de défaut (defProba) — estimée via matrices de risque
• Risque de refinancement (refinRisk) — exposition au rollover`,
    technical: `Routes : /anadette/anaopfin, /anadette/anaopfin/[optId], /anadette/evaopfin, /anadette/soudet, /anadette/anascen

Modèles Prisma : FinancingOptions, cashflow, Croissance, Reserve
Actions serveur :
  lib/_finActions.ts, _debtSubsActions.ts
  lib/_analysisActions.ts, _cashflowActions.ts
  lib/_croissanceActions.ts, _reserveActions.ts

Matrices utilisées : TransitionMatrix + DefaultMatrix → calcul PD par rating/horizon
Scénarios : 4 types, 10+ variables macro annuelles`,
    features: [
      "Inventaire CRUD des options de financement",
      "Calcul automatique : prix, duration, PD, risque refinancement",
      "Gestion des cashflows associés à chaque option",
      "Analyse de durabilité de la dette (DSA)",
      "Modélisation multi-scénarios macro-économiques",
      "Agrégats : dette/PIB, inflation, balance primaire, exportations",
    ],
    subItems: [
      { title: "Financing Options Analysis", route: "/anadette/anaopfin", description: "CRUD des options de financement avec métriques de risque calculées", icon: <DollarSign size={24} /> },
      { title: "Evaluation of a Financing Option", route: "/anadette/evaopfin", description: "Analyse comparative détaillée : cashflows, valorisation, risque", icon: <DollarSign size={24} /> },
      { title: "Debt Sustainability (DSA)", route: "/anadette/soudet", description: "Analyse de soutenabilité selon les critères FMI/Banque Mondiale", icon: <DollarSign size={24} /> },
      { title: "Scenario Analysis", route: "/anadette/anascen", description: "Scénarios macro avec projections d'impact sur la dette souveraine", icon: <DollarSign size={24} /> },
    ],
  },
  {
    id: "banque",
    title: "Taux de Change & Swaps",
    navTitle: "Taux de Change (FX Rates)",
    route: "/banque",
    category: "Dérivés",
    icon: <Building2 size={18} />,
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-400/10",
    business: `Module de valorisation des instruments de couverture du risque de taux et de change. Permet aux trésoriers souverains de calculer la juste valeur (Mark-to-Market) des swaps utilisés pour couvrir leur exposition.

Produits disponibles :
1. Interest Rate Swap (IRS) — Échange flux taux fixe vs variable
2. Cross-Currency Swap (CCS) — Échange de devises avec composante de taux
3. Commodity Price Swap — Échange basé sur les prix des matières premières`,
    technical: `Routes : /banque/irs, /banque/ccs, /banque/comos
Actions serveur : lib/_bankActions.ts (24KB — calculs complexes multi-jambe)

Schémas Zod :
  InterestRateSchema : devise fixe/flottante, fréquences, payer/receiver
  CommoPriceSchema : prix commodité fixe/variable
  CrossPriceSchema : deux notionnels, deux courbes, taux de change

Modèles Prisma : Currency, ZCRates, ForwardRate, CommoForwardRate
Fréquences swap (SwapFreqList) : 1 mois à 24 mois`,
    features: [
      "Valorisation IRS (payer/receiver, fixe/variable)",
      "Cross-Currency Swap avec deux jambes multi-devises",
      "Commodity Swap sur prix fixes et variables",
      "Intégration courbes ZC et forward de devise",
    ],
    subItems: [
      { title: "Interest Rate Swap (IRS)", route: "/banque/irs", description: "Swap de taux : juste valeur des jambes fixes et flottantes", icon: <Building2 size={24} /> },
      { title: "Cross-Currency Swap (CCS)", route: "/banque/ccs", description: "Swap multi-devises avec deux notionnels et deux courbes de taux", icon: <Building2 size={24} /> },
      { title: "Commodity Price Swap", route: "/banque/comos", description: "Swap sur prix de matières premières (cuivre, pétrole, or…)", icon: <Building2 size={24} /> },
    ],
  },
  {
    id: "financingCapacity",
    title: "Capacité de Financement",
    navTitle: "Capacité de Financement",
    route: "/financingCapacity",
    category: "Analyse",
    icon: <Globe size={18} />,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
    business: `Outil de calcul de la capacité de financement souveraine. Évalue le montant maximal qu'un État peut emprunter en tenant compte des conditions macro-économiques courantes.

Paramètres d'entrée :
• Taux d'intérêt et spread souverain (pré-chargés depuis les référentiels BCC)
• Taux de change et taux de référence (USD/CDF, EUR/CDF)
• Inflation nationale et taux d'inflation de référence
• Performance des matières premières et cours sélectionné

Usage métier :
• Calibrer les plafonds d'emprunt annuels pour le budget de l'État
• Préparer les négociations avec le FMI et la Banque Mondiale`,
    technical: `Route : /financingCapacity
Composant : components/financingCapacity/finCapForm.tsx
Schéma Zod : FinCapSchema

Actions serveur : lib/_finCapActions.ts
  computeFinCap()    → capacité + analyse contextuelle
  computeFaitHisto() → faits historiques

Note : taux d'intérêt et spread souverain verrouillés par défaut (alimentés BCC).`,
    features: [
      "Calcul de la capacité maximale d'emprunt souverain",
      "Paramètres pré-chargés depuis les référentiels BCC et FX",
      "Analyse contextuelle générée côté serveur",
      "Faits historiques de référence",
      "Résumé de synthèse pour le reporting",
    ],
  },
  {
    id: "admin",
    title: "Administration",
    navTitle: "Administration",
    route: "/admin",
    category: "Administration",
    icon: <Settings size={18} />,
    iconColor: "text-rose-400",
    iconBg: "bg-rose-400/10",
    badge: "ADMIN",
    business: `Espace réservé aux administrateurs. Permet de gérer l'ensemble des référentiels nécessaires au bon fonctionnement des modules de valorisation.

Responsabilités de l'administrateur :
• Créer et activer les comptes utilisateurs (ACTIF/INACTIF)
• Maintenir les référentiels de pays et continents avec leurs courbes de taux
• Configurer les matrices de risque (Transition, Défaut, Implicite)
• Lancer les traitements par lots pour importer les données de marché

Importance : La qualité des données de référence conditionne directement la fiabilité des calculs.`,
    technical: `Routes : /admin, /admin/users, /admin/users/[userId], /admin/countries, /admin/matrix, /admin/batches

Modèles Prisma : User, Country, Continent, TransitionMatrix, DefaultMatrix, ImpliciteMatrix
Actions serveur :
  lib/_userActions.ts, _matrix.ts, _otherActions.ts
  lib/_bccIntRatesActions.ts, _fxratesActions.ts, _ycAction.ts

Composants : components/user/*, components/matrix/*`,
    features: [
      "CRUD des utilisateurs (création, activation, suspension)",
      "Administration des pays et continents avec courbes de taux",
      "Matrices Transition (rating→rating), Défaut (PD/an), Implicite (spreads)",
      "Traitements par lots : import FX, taux BCC, courbes de taux",
      "Recherche et pagination des listes",
    ],
    subItems: [
      { title: "Gestion des utilisateurs", route: "/admin/users", description: "Liste paginée, statut ACTIF/INACTIF, rôle AGENT/ADMIN", icon: <Settings size={24} /> },
      { title: "Pays et continents", route: "/admin/countries", description: "Entités souveraines avec courbes de rendement associées", icon: <Globe size={24} /> },
      { title: "Matrices de risque", route: "/admin/matrix", description: "Transition (AAA→D), Défaut (PD 1-10 ans), Implicite (spreads)", icon: <Layers size={24} /> },
      { title: "Traitements par lots", route: "/admin/batches", description: "Import en masse des données de marché (FX, BCC, courbes)", icon: <Settings size={24} /> },
    ],
  },
  {
    id: "roles",
    title: "Rôles & Permissions",
    navTitle: "Rôles & Permissions",
    route: "#",
    category: "Sécurité",
    icon: <Shield size={18} />,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-400/10",
    business: `Modèle d'autorisation basé sur les rôles (RBAC) qui contrôle l'accès aux différentes fonctionnalités de la plateforme.

Rôles disponibles :
• AGENT (par défaut) : Accès aux modules de valorisation, analyse et consultation
• ADMIN : Accès complet, incluant la gestion des référentiels et des utilisateurs

Statuts utilisateur :
• ACTIF : Le compte est opérationnel et peut se connecter
• INACTIF : Le compte est suspendu ou en attente d'activation par un admin`,
    technical: `Implémentation :
  auth.ts — NextAuth callbacks injectant role et userId dans le JWT
  middleware.ts — vérification session sur /overview et /valorisation
  Composants serveur — contrôle du rôle côté serveur (admin pages)

Données Prisma :
  User.role : UserRoles enum (AGENT | ADMIN)
  User.status : UserStatuses enum (ACTIF | INACTIF)

Points d'amélioration identifiés :
  • Protection middleware /admin (role ADMIN) à compléter
  • Rate limiting sur /auth/login à implémenter`,
    features: [
      "2 rôles : AGENT (accès métier) et ADMIN (accès complet)",
      "2 statuts : ACTIF et INACTIF",
      "Sessions JWT avec role et userId intégrés",
      "Middleware Next.js de protection des routes",
      "Contrôle de rôle dans les composants serveur",
    ],
  },
  {
    id: "architecture",
    title: "Schéma d'Architecture",
    navTitle: "Schéma architecture",
    route: "#",
    category: "Technique",
    icon: <Layers size={18} />,
    iconColor: "text-slate-400",
    iconBg: "bg-slate-400/10",
    business: `Vision globale de l'architecture applicative pour les équipes techniques chargées de la maintenance, l'évolution et le déploiement de la plateforme Convergence.`,
    technical: `COUCHE PRÉSENTATION
• Next.js 14 App Router — Server Components + Client Components
• Tailwind CSS + Shadcn/ui — design system accessible (WCAG 2.1)
• next-themes — thème sombre/clair

COUCHE MÉTIER (Server Actions)
• 16 fichiers lib/_*Actions.ts — calculs financiers côté serveur
• Validation Zod sur chaque soumission de formulaire
• Pas d'API REST exposée — Server Actions Next.js directes

COUCHE DONNÉES
• PostgreSQL 15+ avec Prisma ORM 5.17.0
• 22 modèles de données relationnels
• prisma/seed.ts — initialisation des référentiels

DÉPLOIEMENT
• Build : prisma generate && next build
• Docker-ready (Dockerfile présent)
• Variables : DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL`,
    features: [
      "Architecture SSR/SSG hybride Next.js 14 (App Router)",
      "Server Actions comme couche API interne",
      "ORM Prisma avec migrations versionées",
      "Design system Shadcn/Radix (accessibilité WCAG 2.1)",
      "Déploiement Docker-ready",
    ],
  },
  {
    id: "stack",
    title: "Stack Technique",
    navTitle: "Stack technique",
    route: "#",
    category: "Technique",
    icon: <Layers size={18} />,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-400/10",
    business: `Vue d'ensemble de l'ensemble des technologies et bibliothèques utilisées dans la plateforme Convergence, avec leur version et leur rôle dans l'architecture.`,
    technical: `Framework : Next.js 14.2.5 (App Router)
Langage : TypeScript 5
Base de données : PostgreSQL 15+ / Prisma ORM 5.17.0
Auth : NextAuth 5.0.0-beta.19
UI : Shadcn/ui + Radix UI + Tailwind CSS 3.4.1
Graphiques : Recharts 2.13.0-alpha.5
Formulaires : React Hook Form 7.52.1
Validation : Zod 3.23.8
Animations : Framer Motion 11.3.19
Export : XLSX 0.20.3 + jsPDF
Icônes : Lucide React 0.411.0, React Icons 5.2.1
Toast : Sonner 1.5.0
Thème : next-themes 0.3.0`,
    features: [
      "Next.js 14 — SSR, SSG, Server Actions, App Router",
      "PostgreSQL + Prisma ORM — 22 modèles relationnels",
      "NextAuth 5 — JWT, Credentials provider",
      "Shadcn/ui — composants Radix accessibles",
      "Recharts — visualisations financières",
      "jsPDF + XLSX — export PDF et Excel",
    ],
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "20+", label: "Pages documentées" },
  { value: String(docSections.length), label: "Sections" },
  { value: "2", label: "Rôles utilisateurs" },
  { value: "9", label: "Produits financiers" },
];

// ─── PDF helpers (unchanged) ──────────────────────────────────────────────────

const APP_NAME = "Emergence";
const AUTHOR = "EmergenceRDC";
const BLUE = [15, 76, 129] as const;
const GREEN = [0, 100, 50] as const;
const DARK = [40, 40, 40] as const;
const MUTED = [100, 100, 100] as const;

function makeTextAdder(doc: any, _margin: number, contentWidth: number) {
  return function addText(text: string, x: number, y: number, maxWidth?: number, lh = 5.5): number {
    const lines = doc.splitTextToSize(text, maxWidth ?? contentWidth);
    for (const line of lines) {
      if (y > 275) { doc.addPage(); y = 20; }
      doc.text(line, x, y);
      y += lh;
    }
    return y;
  };
}

async function generateDocumentationPDF() {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  const dateStr = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  doc.setProperties({
    title: `Documentation — ${APP_NAME}`, author: AUTHOR,
    subject: `Documentation complète de l'application ${APP_NAME}`,
    keywords: "convergence, dette souveraine, RDC, documentation",
    creator: `${APP_NAME} — ${AUTHOR}`,
  });

  const addText = makeTextAdder(doc, margin, contentWidth);

  // Cover
  doc.setFillColor(...BLUE);
  doc.rect(0, 0, pageWidth, 70, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(34); doc.setFont("helvetica", "bold");
  doc.text(APP_NAME.toUpperCase(), pageWidth / 2, 38, { align: "center" });
  doc.setFontSize(13); doc.setFont("helvetica", "normal");
  doc.text("Documentation Utilisateur & Technique", pageWidth / 2, 52, { align: "center" });

  doc.setTextColor(...DARK);
  let y = 90;
  [["Auteur", AUTHOR], ["Application", APP_NAME], ["Version", "1.0"], ["Date", dateStr], ["Domaine", "Analyse Financière Souveraine — Marchés Émergents"]].forEach(([label, value]) => {
    doc.setFontSize(10); doc.setFont("helvetica", "bold"); doc.text(`${label} :`, margin, y);
    doc.setFont("helvetica", "normal"); doc.text(value, margin + 40, y); y += 9;
  });

  doc.setDrawColor(...BLUE); doc.setLineWidth(0.4); doc.line(margin, y + 2, pageWidth - margin, y + 2); y += 10;
  doc.setFontSize(9); doc.setFont("helvetica", "italic"); doc.setTextColor(80, 80, 80);
  y = addText(`Ce document décrit l'ensemble des fonctionnalités de la plateforme ${APP_NAME}, développée par ${AUTHOR} pour la gestion et l'optimisation de la dette souveraine de la RDC.`, margin, y, contentWidth, 5);
  y += 8;

  doc.setFontSize(13); doc.setFont("helvetica", "bold"); doc.setTextColor(...BLUE);
  doc.text("Table des matières", margin, y);
  doc.setLineWidth(0.3); doc.line(margin, y + 3, pageWidth - margin, y + 3); y += 10;
  doc.setFontSize(9);
  docSections.forEach((s, i) => {
    if (y > 272) { doc.addPage(); y = 20; }
    doc.setTextColor(...DARK); doc.setFont("helvetica", "normal");
    doc.text(`${i + 1}.  ${s.title}`, margin + 4, y);
    doc.setTextColor(...MUTED); doc.text(s.category, pageWidth - margin - 2, y, { align: "right" }); y += 7;
  });

  doc.setFontSize(8); doc.setTextColor(160, 160, 160);
  doc.text(`Confidentiel — ${AUTHOR} © ${new Date().getFullYear()}`, pageWidth / 2, 287, { align: "center" });

  docSections.forEach((section, idx) => {
    doc.addPage(); let py = 0;
    doc.setFillColor(...BLUE); doc.rect(0, 0, pageWidth, 24, "F");
    doc.setTextColor(255, 255, 255); doc.setFontSize(14); doc.setFont("helvetica", "bold");
    doc.text(`${idx + 1}. ${section.title}`, margin, 15);
    doc.setFontSize(9); doc.setFont("helvetica", "normal");
    doc.text(section.category, pageWidth - margin, 15, { align: "right" });
    doc.setTextColor(...DARK); py = 32;

    if (section.route !== "#") {
      doc.setFontSize(8); doc.setFont("helvetica", "italic"); doc.setTextColor(90, 90, 90);
      doc.text(`Route : ${section.route}`, margin, py); doc.setTextColor(...DARK); py += 7;
    }

    const at = makeTextAdder(doc, margin, contentWidth);

    doc.setFillColor(235, 245, 255); doc.rect(margin - 2, py - 4, contentWidth + 4, 7, "F");
    doc.setFontSize(11); doc.setFont("helvetica", "bold"); doc.setTextColor(...BLUE);
    doc.text("Perspective Métier", margin, py + 1); doc.setTextColor(...DARK); py += 9;
    doc.setFontSize(9); doc.setFont("helvetica", "normal"); py = at(section.business, margin, py, contentWidth, 5); py += 5;

    if (py > 245) { doc.addPage(); py = 20; }
    doc.setFillColor(235, 255, 240); doc.rect(margin - 2, py - 4, contentWidth + 4, 7, "F");
    doc.setFontSize(11); doc.setFont("helvetica", "bold"); doc.setTextColor(...GREEN);
    doc.text("Perspective Technique", margin, py + 1); doc.setTextColor(...DARK); py += 9;
    doc.setFontSize(9); doc.setFont("helvetica", "normal"); py = at(section.technical, margin, py, contentWidth, 5); py += 5;

    if (py > 245) { doc.addPage(); py = 20; }
    doc.setFillColor(255, 248, 230); doc.rect(margin - 2, py - 4, contentWidth + 4, 7, "F");
    doc.setFontSize(11); doc.setFont("helvetica", "bold"); doc.setTextColor(150, 80, 0);
    doc.text("Fonctionnalités clés", margin, py + 1); doc.setTextColor(...DARK); py += 9;
    doc.setFontSize(9); doc.setFont("helvetica", "normal");
    section.features.forEach((f) => { if (py > 272) { doc.addPage(); py = 20; } doc.text(`•  ${f}`, margin + 3, py); py += 5.5; });

    doc.setFontSize(8); doc.setTextColor(160, 160, 160);
    doc.text(`${APP_NAME} — ${AUTHOR} © ${new Date().getFullYear()}`, pageWidth / 2, 287, { align: "center" });
    doc.text(`${idx + 2}`, pageWidth - margin, 287, { align: "right" });
  });

  doc.save("convergence-documentation.pdf");
}

async function generateCahierChargesPDF() {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  const year = new Date().getFullYear();
  const dateStr = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  doc.setProperties({
    title: `Cahier des Charges — ${APP_NAME}`, author: AUTHOR,
    subject: `Cahier des charges technique et fonctionnel de l'application ${APP_NAME}`,
    keywords: "convergence, cahier des charges, dette souveraine, RDC",
    creator: `${APP_NAME} — ${AUTHOR}`,
  });

  const addText = makeTextAdder(doc, margin, contentWidth);
  const secTitle = (title: string, y: number): number => {
    if (y > 250) { doc.addPage(); y = 20; }
    doc.setFillColor(230, 240, 255); doc.rect(margin - 2, y - 4, contentWidth + 4, 8, "F");
    doc.setFontSize(12); doc.setFont("helvetica", "bold"); doc.setTextColor(...BLUE);
    doc.text(title, margin, y + 2); doc.setTextColor(...DARK); return y + 12;
  };
  const bul = (text: string, y: number): number => {
    if (y > 272) { doc.addPage(); y = 20; }
    doc.text(`•  ${text}`, margin + 3, y); return y + 5.5;
  };

  // Cover
  doc.setFillColor(18, 38, 78); doc.rect(0, 0, pageWidth, 297, "F");
  doc.setFillColor(...BLUE); doc.rect(0, 65, pageWidth, 55, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26); doc.setFont("helvetica", "bold");
  doc.text("CAHIER DES CHARGES", pageWidth / 2, 88, { align: "center" });
  doc.setFontSize(15); doc.setFont("helvetica", "normal");
  doc.text(`Application ${APP_NAME.toUpperCase()}`, pageWidth / 2, 104, { align: "center" });

  let cy = 145;
  [["Référence", `CDC-${APP_NAME.toUpperCase()}-${year}-v1.0`], ["Auteur", AUTHOR], ["Application", APP_NAME], ["Version", "1.0"], ["Date", dateStr], ["Statut", "Document de référence"], ["Domaine", "Analyse Financière Souveraine"], ["Périmètre", "RDC & Marchés Émergents"]].forEach(([l, v]) => {
    doc.setFontSize(10); doc.setFont("helvetica", "bold"); doc.setTextColor(180, 210, 255); doc.text(`${l} :`, margin + 10, cy);
    doc.setFont("helvetica", "normal"); doc.setTextColor(220, 235, 255); doc.text(v, margin + 55, cy); cy += 9;
  });
  doc.setFontSize(8); doc.setTextColor(120, 150, 200);
  doc.text(`Document confidentiel — ${AUTHOR} © ${year}`, pageWidth / 2, 287, { align: "center" });

  // Page 2: Context
  doc.addPage();
  doc.setFillColor(...BLUE); doc.rect(0, 0, pageWidth, 24, "F");
  doc.setTextColor(255, 255, 255); doc.setFontSize(14); doc.setFont("helvetica", "bold");
  doc.text("1. Contexte et Objectifs", margin, 15); doc.setTextColor(...DARK);
  let y = 32;
  y = secTitle("1.1 Contexte", y);
  doc.setFontSize(10); doc.setFont("helvetica", "normal");
  y = addText(`La République Démocratique du Congo fait face à des défis complexes en matière de gestion de la dette publique. La plateforme ${APP_NAME}, développée par ${AUTHOR}, centralise les outils d'analyse quantitative, de modélisation macro-économique et de pricing des instruments de dette selon les standards internationaux.`, margin, y, contentWidth);
  y += 6;
  y = secTitle("1.2 Objectifs", y); doc.setFontSize(10); doc.setFont("helvetica", "normal");
  ["OBJ-01 : Valoriser les instruments de dette souveraine selon les standards internationaux", "OBJ-02 : Fournir une analyse de durabilité de la dette (DSA) conforme FMI/BM", "OBJ-03 : Modéliser des scénarios macro-économiques pour anticiper l'impact sur la dette", "OBJ-04 : Calculer la capacité de financement souveraine", "OBJ-05 : Centraliser la gestion des données de marché", "OBJ-06 : Assurer un contrôle d'accès sécurisé avec séparation des rôles", "OBJ-07 : Permettre l'export des analyses en PDF et Excel"].forEach(o => { y = bul(o, y); });
  y += 4;
  y = secTitle("1.3 Utilisateurs cibles", y); doc.setFontSize(10); doc.setFont("helvetica", "normal");
  ["Gestionnaires de dette — Ministère des Finances", "Analystes financiers — BCC", "Trésoriers souverains", "Administrateurs — gestion des référentiels"].forEach(u => { y = bul(u, y); });

  // Page 3: Functional requirements
  doc.addPage();
  doc.setFillColor(...BLUE); doc.rect(0, 0, pageWidth, 24, "F");
  doc.setTextColor(255, 255, 255); doc.setFontSize(14); doc.setFont("helvetica", "bold");
  doc.text("2. Exigences Fonctionnelles", margin, 15); doc.setTextColor(...DARK); y = 32;
  const efSections: [string, string[]][] = [
    ["2.1 Authentification et accès", ["EF-AUTH-01 : Création de compte avec email, username et mot de passe (min. 6 caractères)", "EF-AUTH-02 : Authentification par nom d'utilisateur / mot de passe", "EF-AUTH-03 : Mots de passe hashés bcrypt", "EF-AUTH-04 : Sessions JWT avec expiration configurable", "EF-AUTH-05 : Routes /overview et /valorisation/* protégées par session", "EF-AUTH-06 : Espace /admin accessible uniquement au rôle ADMIN"]],
    ["2.2 Valorisation obligataire", ["EF-VAL-01 : Types supportés : Straight, Floating, Step-Up, Dual Currency, Commodity-Linked et variantes amorties", "EF-VAL-02 : Calcul de : prix obligataire, duration modifiée, convexité, probabilité de défaut", "EF-VAL-03 : Courbes : zero-coupon (zcc), yield curve (yic), implied spread (inc)", "EF-VAL-04 : Devises : USD, EUR, CDF", "EF-VAL-05 : Options via Black-Scholes, Monte Carlo et Binomial Tree"]],
    ["2.3 Analyse de dette", ["EF-DET-01 : CRUD complet des options de financement", "EF-DET-02 : Métriques calculées : bondPrice, duration, defProba, refinRisk", "EF-DET-03 : Gestion des cashflows associés à chaque option", "EF-DET-04 : Analyse de durabilité de la dette (DSA)", "EF-DET-05 : Module de scénarios macro avec ≥10 variables/scénario/année"]],
    ["2.4 Produits bancaires", ["EF-BNK-01 : Valorisation des IRS (payer/receiver, fixe/flottant)", "EF-BNK-02 : Valorisation des CCS avec deux notionnels et deux courbes", "EF-BNK-03 : Valorisation des Commodity Swaps", "EF-BNK-04 : Fréquences de swap : 1 mois à 24 mois"]],
    ["2.5 Administration", ["EF-ADM-01 : CRUD des comptes utilisateurs avec gestion statut et rôle", "EF-ADM-02 : Gestion des pays/continents avec courbes de taux associées", "EF-ADM-03 : CRUD des matrices Transition, Défaut et Implicite", "EF-ADM-04 : Traitements par lots pour l'import des données de marché"]],
  ];
  efSections.forEach(([title, reqs]) => {
    y = secTitle(title, y); doc.setFontSize(10); doc.setFont("helvetica", "normal");
    reqs.forEach(r => { y = bul(r, y); }); y += 4;
  });

  // Page 4: Non-functional + Architecture
  doc.addPage();
  doc.setFillColor(...BLUE); doc.rect(0, 0, pageWidth, 24, "F");
  doc.setTextColor(255, 255, 255); doc.setFontSize(14); doc.setFont("helvetica", "bold");
  doc.text("3. Exigences Non-Fonctionnelles & Architecture", margin, 15); doc.setTextColor(...DARK); y = 32;
  const nfReqs: [string, string[]][] = [
    ["3.1 Performance", ["ENF-PERF-01 : Calculs obligataires retournés en moins de 3 secondes", "ENF-PERF-02 : Pages de liste paginées — chargement initial sous 2 secondes", "ENF-PERF-03 : Rendu SSR pour minimiser le First Contentful Paint"]],
    ["3.2 Sécurité", ["ENF-SEC-01 : Hashage bcrypt (facteur de coût ≥ 10)", "ENF-SEC-02 : Routes sensibles protégées par middleware Next.js", "ENF-SEC-03 : Validation Zod de toutes les entrées", "ENF-SEC-04 : Requêtes Prisma paramétrées — protection SQL injection", "ENF-SEC-05 : Sessions JWT avec expiration configurable"]],
    ["3.3 Accessibilité", ["ENF-ACC-01 : Interface responsive (mobile, tablette, desktop)", "ENF-ACC-02 : Support du thème sombre et clair", "ENF-ACC-03 : Composants conformes WCAG 2.1 (via Radix UI)"]],
    ["3.4 Déploiement", ["ENF-DEP-01 : Application déployable via Docker", "ENF-DEP-02 : Build : prisma generate && next build", "ENF-DEP-03 : Variables : DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL"]],
  ];
  nfReqs.forEach(([title, reqs]) => { y = secTitle(title, y); doc.setFontSize(10); doc.setFont("helvetica", "normal"); reqs.forEach(r => { y = bul(r, y); }); y += 4; });

  y = secTitle("4. Stack Technique", y); doc.setFontSize(10); doc.setFont("helvetica", "normal");
  [["Framework", "Next.js 14.2.5 (App Router)"], ["Langage", "TypeScript 5"], ["Base de données", "PostgreSQL 15+ / Prisma ORM 5.17.0"], ["Auth", "NextAuth 5.0.0-beta.19"], ["UI", "Shadcn/ui + Radix UI + Tailwind CSS 3.4.1"], ["Graphiques", "Recharts 2.13.0"], ["Validation", "Zod 3.23.8 + React Hook Form 7.52.1"], ["Export", "XLSX 0.20.3 + jsPDF"]].forEach(([comp, lib]) => {
    if (y > 272) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold"); doc.text(`${comp} :`, margin + 3, y);
    doc.setFont("helvetica", "normal"); doc.text(lib, margin + 45, y); y += 6;
  });

  const total = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i); doc.setFontSize(8); doc.setTextColor(160, 160, 160);
    doc.text(`Cahier des Charges — ${APP_NAME} — ${AUTHOR} © ${year}`, pageWidth / 2, 290, { align: "center" });
    doc.text(`${i} / ${total}`, pageWidth - margin, 290, { align: "right" });
  }
  doc.save("convergence-cahier-des-charges.pdf");
}

// ─── Sub-item preview card ────────────────────────────────────────────────────

function SubCard({ sub, iconColor }: { sub: SubItem; iconColor: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 overflow-hidden flex flex-col">
      <div className={cn("flex items-center justify-center h-32 bg-muted/20 border-b border-border", iconColor)}>
        <div className="opacity-20 scale-[3]">{sub.icon}</div>
      </div>
      <div className="p-3 space-y-0.5">
        <p className="text-sm font-semibold text-foreground leading-tight">{sub.title}</p>
        <code className="text-[10px] text-muted-foreground font-mono block">{sub.route}</code>
        <p className="text-xs text-muted-foreground leading-relaxed pt-1">{sub.description}</p>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [loadingCdc, setLoadingCdc] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Intersection observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section-id");
            if (id) setActiveSection(id);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current.get(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileNavOpen(false);
    }
  };

  const handleDownloadDoc = async () => {
    setLoadingDoc(true);
    try { await generateDocumentationPDF(); toast.success("Documentation PDF générée"); }
    catch { toast.error("Erreur lors de la génération du PDF"); }
    finally { setLoadingDoc(false); }
  };

  const handleDownloadCdc = async () => {
    setLoadingCdc(true);
    try { await generateCahierChargesPDF(); toast.success("Cahier des charges PDF généré"); }
    catch { toast.error("Erreur lors de la génération du PDF"); }
    finally { setLoadingCdc(false); }
  };

  const activeInfo = docSections.find((s) => s.id === activeSection);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 md:px-5 pb-20">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="py-6 md:py-8">
        <div className="flex items-start gap-3 mb-2">
          <BookOpen className="text-emerald-400 mt-1 flex-shrink-0" size={28} />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Documentation
          </h1>
        </div>
        <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-2xl">
          Guide complet de la plateforme{" "}
          <span className="font-semibold text-emerald-400">{APP_NAME}</span>{" "}
          —description technique et métier de chaque page, rôles d&apos;accès et architecture système.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            onClick={handleDownloadDoc}
            disabled={loadingDoc}
            className="bg-emerald-700 hover:bg-emerald-800 text-white gap-2 text-sm"
          >
            <Download size={15} />
            {loadingDoc ? "Génération…" : "Télécharger la documentation (PDF)"}
          </Button>
          <Button
            onClick={handleDownloadCdc}
            disabled={loadingCdc}
            variant="outline"
            className="gap-2 text-sm border-border hover:bg-muted"
          >
            <FileText size={15} />
            {loadingCdc ? "Génération…" : "Cahier des Charges (PDF)"}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card px-4 py-3 text-center"
            >
              <p className="text-xl md:text-2xl font-bold text-emerald-400">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <Separator />
      </div>

      {/* ── Mobile nav dropdown ──────────────────────────────────────────── */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setMobileNavOpen((p) => !p)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-card text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            <span className={activeInfo?.iconColor}>{activeInfo?.icon}</span>
            <span>{activeInfo?.title}</span>
          </span>
          <ChevronDown
            size={16}
            className={cn("transition-transform text-muted-foreground", mobileNavOpen && "rotate-180")}
          />
        </button>
        {mobileNavOpen && (
          <div className="mt-1 rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
            {docSections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors",
                  activeSection === s.id
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-muted-foreground hover:bg-muted/60"
                )}
              >
                <span className={cn("flex-shrink-0", s.iconColor)}>{s.icon}</span>
                <span>{s.navTitle}</span>
                {s.badge && <Badge className="ml-auto text-[10px] bg-sky-700 text-white">{s.badge}</Badge>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Two-column layout ────────────────────────────────────────────── */}
      <div className="flex gap-6 items-start">

        {/* Left nav (desktop only) */}
        <nav className="hidden md:block w-52 flex-shrink-0 sticky top-4">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1">
            Navigation
          </p>
          <ul className="space-y-0.5">
            {docSections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-colors group",
                    activeSection === s.id
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <span className={cn("flex-shrink-0", activeSection === s.id ? s.iconColor : "")}>
                    {s.icon}
                  </span>
                  <span className="truncate text-xs leading-tight">{s.navTitle}</span>
                  {s.badge && (
                    <Badge className="ml-auto text-[9px] px-1 py-0 bg-sky-700 text-white flex-shrink-0">
                      {s.badge}
                    </Badge>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right content */}
        <div className="flex-1 min-w-0 space-y-14 md:space-y-20">
          {docSections.map((section) => (
            <div
              key={section.id}
              data-section-id={section.id}
              ref={(el) => {
                if (el) sectionRefs.current.set(section.id, el);
                else sectionRefs.current.delete(section.id);
              }}
            >
              {/* Section heading */}
              <div className="flex items-center gap-3 mb-5">
                <div className={cn("p-2.5 rounded-xl flex-shrink-0", section.iconBg)}>
                  <span className={section.iconColor}>{section.icon}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                      {section.title}
                    </h2>
                    {section.badge && (
                      <Badge className="text-xs bg-sky-700 text-white">{section.badge}</Badge>
                    )}
                  </div>
                  {section.route !== "#" && (
                    <code className="text-xs text-muted-foreground font-mono">{section.route}</code>
                  )}
                </div>
              </div>

              {/* Sub-items preview grid */}
              {section.subItems && section.subItems.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {section.subItems.map((sub, i) => (
                    <SubCard key={i} sub={sub} iconColor={section.iconColor} />
                  ))}
                </div>
              )}

              {/* Business & Technical cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl border border-border bg-card p-4 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500 inline-block flex-shrink-0" />
                    <h3 className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                      Perspective Métier
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
                    {section.business}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-4 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block flex-shrink-0" />
                    <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Perspective Technique
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-foreground/80 whitespace-pre-line leading-relaxed font-mono">
                    {section.technical}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Fonctionnalités clés
                  </h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {section.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-foreground/80">
                      <ChevronRight size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Bottom download strip */}
          <div className="rounded-xl border border-border bg-card p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Télécharger les documents officiels</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Métadonnées PDF : Auteur — {AUTHOR} · Application — {APP_NAME}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto flex-shrink-0">
              <Button onClick={handleDownloadDoc} disabled={loadingDoc}
                className="bg-emerald-700 hover:bg-emerald-800 text-white gap-2 text-sm w-full sm:w-auto">
                <Download size={14} />
                {loadingDoc ? "Génération…" : "Documentation PDF"}
              </Button>
              <Button onClick={handleDownloadCdc} disabled={loadingCdc}
                variant="outline" className="gap-2 text-sm w-full sm:w-auto">
                <FileText size={14} />
                {loadingCdc ? "Génération…" : "Cahier des Charges PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
