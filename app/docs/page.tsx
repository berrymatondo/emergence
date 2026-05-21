import DocsPage from "@/components/docs/DocsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation — Convergence",
  description:
    "Documentation complète de l'application Convergence — valorisation de dette souveraine et analyse financière pour les marchés émergents.",
  authors: [{ name: "EmergenceRDC" }],
  applicationName: "Convergence",
  keywords: [
    "convergence",
    "dette souveraine",
    "RDC",
    "marchés émergents",
    "valorisation",
    "documentation",
  ],
};

export default function DocsPageRoute() {
  return <DocsPage />;
}
