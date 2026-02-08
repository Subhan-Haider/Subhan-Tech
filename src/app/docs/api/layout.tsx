import { Metadata } from "next";

export const metadata: Metadata = {
    title: "API Reference",
    description: "Complete REST API documentation for Neural services, including authentication and rate limits.",
    alternates: {
        canonical: "/docs/api",
    },
};

export default function ApiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
