import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore Subhan's portfolio of web applications, browser extensions, and developer tools.",
    alternates: {
        canonical: "/projects",
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
