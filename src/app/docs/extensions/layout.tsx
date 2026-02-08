import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Building Extensions",
    description: "Learn how to build, configure, and publish browser extensions using the Neural architecture.",
    alternates: {
        canonical: "/docs/extensions",
    },
};

export default function ExtensionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
