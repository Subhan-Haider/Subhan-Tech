import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Getting Started",
    description: "Detailed instructions on prerequisites, installation, and initial configuration for Neural projects.",
    alternates: {
        canonical: "/docs/getting-started",
    },
};

export default function GettingStartedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
