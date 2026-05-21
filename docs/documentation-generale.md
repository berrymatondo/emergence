# Documentation générale de l'application

## Vue d’ensemble
- Application Next.js (App Router) destinée à l’analyse et la valorisation de la dette souveraine et des instruments dérivés pour la RDC et, plus largement, les marchés émergents.
- Authentification via NextAuth (provider Credentials) avec sessions JWT ; les pages `overview` et tout l’espace `valorisation` exigent une session active.
- Persistance : PostgreSQL via Prisma. Les entités clés sont décrites dans `prisma/schema.prisma` et alimentées par des actions serveur (`lib/_*Actions.ts`).
- UI : composants Shadcn/React Hook Form avec validations Zod définies dans `lib/schemas.ts`.

## Rôles, statuts et accès
- Rôles (`UserRoles`) : `ADMIN`, `AGENT`. Les admins gèrent les référentiels (utilisateurs, pays, matrices, lots), les agents consultent et valorisent.
- Statuts (`UserStatuses`) : `ACTIF`, `INACTIF`. Un compte inactif peut exister mais ne devrait pas obtenir d’accès applicatif.
- Contrôle d’accès implicite : le middleware exige une session pour `overview` et `valorisation`. Les autres routes publiques sont la page d’accueil et l’authentification.
- Authentification : mot de passe minimum 6 caractères, confirmation obligatoire (`RegisterSchema`). Le login nécessite `username` + `password` (`LoginSchema`). Mots de passe stockés hashés (bcrypt).

## Données de marché et référentiels
- Pays/continents : entités `Country` et `Continent` avec courbes des taux (`YieldCurve`) indexées par maturité (tenor), date et granularité (`DataTypeList` H/L).
- Devises (`Currency`) avec courbes zéro-coupon (`ZCRates`) et courbes de taux forward (`ForwardRate`). Liste autorisée des devises : USD, EUR, CDF (`CurrencyList`).
- Taux directeurs BCC (`BCCIntRates`) et taux de change (`FXRates`).
- Matières premières (`Commo`) avec courbes de prix forward (`CommoForwardRate`).
- Calendriers d’amortissement standards (`AmortizationSchedule`, `AmortizationCommoSchedule`) utilisés dans les valorisations amorties.
- Réserves de change (`Reserve`) indexées par code et maturité.
- Matrices de risque : transition, défaut et implicite avec libellé unique et colonnes de notation `AAA` → `NR` + ordre de priorité.

## Valorisation et produits financiers
Entrées validées par Zod (`lib/schemas.ts`) et alimentées par des composants de formulaire dans `components/valorisation`.

### Obligations
- Types gérés : `Straight`, `Floating`, `StepUp`, `Dual Currency`, `Commodity Linked`, et variantes amorties.
- Règles communes : dates (émission, 1er coupon, maturité), `couponCurrency`, `couponRate`, `couponFrequency` (valeurs 1–12), base de coupon (`CouponBasisList` : AA, A0, A5), notionnel, prime de liquidité, pays de défaut et sélection du type de courbe (`curveType` : zcc, yic, inc). Option de forcer le prix (`forcedBondPrice`).
- Amortissement : nécessite `amortizationStartDate` et `amortizationFrequency`; peut combiner deux courbes/liquidités (ex. `ASBSchema`).
- Dual currency : deux devises/courbes/liquidités et pays de défaut distincts.
- Commodity linked : ajoute `fixedCoupon`, `maxCoupon`, et la marchandise sous-jacente.

### Options financières
- Européennes : style fixé à `European`, modèles autorisés `Black-Scholes` ou `Monte Carlo`.
- Américaines : style `American`, modèles `Black-Scholes`, `Monte Carlo` ou `Binomial Tree`.
- Paramètres communs : maturité, devise, spot, strike, type (`call`/`put`), courbe et prime de liquidité facultative.

### Produits de taux et de couverture (banque)
- Swaps de taux (`InterestRateSchema`) : devise fixe/flottante, fréquences, payer/receiver (`fixedLeg` ou `floatingLeg`), notional, courbe et prime de liquidité.
- Swaps de prix de matières premières (`CommoPriceSchema`) : mêmes règles que les swaps de taux mais sur prix fixes/variables.
- Cross-currency swaps (`CrossPriceSchema`) : deux notionnels, taux fixe, taux de change, deux courbes/liquidités/pays de défaut, sens payer/receiver.

### Capacités de financement
- Formulaire `FinCapForm` (page `financingCapacity`) avec `finCapSchema` : taux d’intérêt et spread souverain (verrouillés par défaut), taux/ref de change, inflation/référence, performance matières premières et cours sélectionné.
- Calculs côté serveur (`computeFinCap`, `computeFaitHisto`) retournent : capacité de financement, analyse contextuelle, faits historiques et en-tête de synthèse.

### Analyse de dette
- Options de financement (`FinOptSchema` / table `FinancingOptions`) : code, type de valorisation (straight/amortized), modalités (due date vs amortized), base de coupon, fréquence, rating, recovering, devise et dates clefs. Calculs stockés : prix obligataire (`bondPrice`), CMA, duration, probabilité de défaut (`defProba`), risque de refinancement (`refinRisk`).
- Cashflows (`cashflow`) liés à un `optId` et identifiés par code.

### Scénarios macro (croissance)
- `Croissance` : scénario (id), type et sous-type (liste dans `scenList`), année, croissance et agrégats macro (dette/PIB interne-externe, inflation nationale/mondiale, solde primaire, exportations/importations, rendement, investissement, variation).

## Règles transverses et listes contrôlées
- Devises autorisées : USD, EUR, CDF (`CurrencyList`).
- Bases de coupon : AA, A0, A5 (`CouponBasisList`).
- Fréquences : coupon 1–12, swap 1 mois → 2 ans (`SwapFreqList`), amortissements jusqu’à 40 périodes (`AmortizedCouponFreqList`).
- Ratings : AAA → CCC/C (`ratings`).
- Types de valorisation : `Straight Bond`, `Amortized Bond` (modality 1/2).
- Styles/options : `European` ou `American`; modèles listés ci-dessus.
- Matrices : libellé unique, ordre numérique pour gérer la priorité d’application.

## Administration et gestion
- Espace `/admin` : liens vers utilisateurs, pays, matrices, lots. `UsersPage` liste paginée/recherchable avec actions de création (via `/auth/register`).
- Gestion des pays et matrices via composants `components/matrix/*` et actions Prisma (`lib/_matrix.ts`, `lib/_otherActions.ts`).

## Parcours utilisateur type
1) Création de compte (ou provision par un admin) → statut `ACTIF`.
2) Connexion (`/auth/login`) → accès aux dashboards (`/overview`) et aux modules métiers (`/valorisation`, `financingCapacity`, `anadette`, `banque`, etc.).
3) Sélection du produit (ex. Straight vs Amortized) → saisie des paramètres validés par Zod → envoi aux actions serveur de calcul → affichage prix, duration, cashflows, courbes, matrices utilisées.
4) Les résultats et inputs peuvent être persistés (options de financement, cashflows, matrices, réserves) via Prisma.

## Points d’attention métier
- Cohérence devises/courbes : toujours aligner `couponCurrency` et la courbe (`curveType`) associée ; pour les produits dual/cross, fournir les deux couples devise/courbe/pays de défaut.
- Dates : les schémas n’imposent pas de validation forte sur les dates (types `string`) ; prévoir un contrôle UI/serveur pour le format ISO si nécessaire.
- Fréquences et bases : se limiter aux valeurs autorisées par les listes contrôlées pour éviter des calculs incohérents.
- Sécurité : les routes sensibles sont protégées par session, mais la distinction `ADMIN`/`AGENT` n’est pas encore appliquée dans le middleware ; à implémenter si nécessaire.
- Données de référence (courbes, matrices, réserves) : doivent être présentes et datées pour que les modules de valorisation retournent des résultats fiables.

## Références techniques
- Authentification : `auth.ts`, `middleware.ts`.
- Modèle de données : `prisma/schema.prisma`.
- Validations métier : `lib/schemas.ts`, listes contrôlées dans `lib/enums.ts`.
- Modules UI/logiciels principaux : `components/valorisation/*`, `components/debtAna/*`, `components/financingCapacity/finCapForm.tsx`, `components/matrix/*`, `components/overview/*`.


