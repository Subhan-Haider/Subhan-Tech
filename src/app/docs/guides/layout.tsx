import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Security & Guides",
    description: "Best practices, data encryption methods, and security guidelines for building secure neural applications.",
    alternates: {
        canonical: "/docs/guides",
    },
};

export default function GuidesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
