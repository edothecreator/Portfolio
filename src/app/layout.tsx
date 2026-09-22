import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edo — Cloud & DevOps Engineer",
  description:
    "Mohamed ELKHANFAF (Edo) — Cloud & DevOps Engineer. AWS, Terraform, Docker, Kubernetes, CI/CD. Building infrastructure that scales.",
  keywords: [
    "Cloud Engineer",
    "DevOps",
    "AWS",
    "Terraform",
    "Docker",
    "Kubernetes",
    "Mohamed ELKHANFAF",
    "Edo",
  ],
  authors: [{ name: "Mohamed ELKHANFAF" }],
  openGraph: {
    title: "Edo — Cloud & DevOps Engineer",
    description:
      "AWS · Terraform · Docker · K8s · CI/CD · Linux. Portfolio built and deployed like infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-bg">{children}</body>
    </html>
  );
}
