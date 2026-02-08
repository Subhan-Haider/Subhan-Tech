import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Insights and articles on web development, browser extension architecture, and neural design principles.",
    alternates: {
        canonical: "/blog",
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
