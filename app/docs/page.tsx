import DocsPage from "@/components/docs/DocsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation — Emergence",
  description:
    "Documentation complète de l'application Emergence — valorisation de dette souveraine et analyse financière pour les marchés émergents.",
  authors: [{ name: "EmergenceRDC" }],
  applicationName: "Emergence",
  keywords: [
    "emergence",
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
