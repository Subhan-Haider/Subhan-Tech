import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Documentation",
    description: "Comprehensive guides, API references, and tutorials for the Neural Hub platform and extensions.",
    alternates: {
        canonical: "/docs",
    },
};

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
