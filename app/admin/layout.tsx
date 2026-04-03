import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Inscritos Webinar BNCC",
  robots: "noindex",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
