import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "Learn about Subhan's mission, vision, and core competencies in web architecture and browser extensions.",
    alternates: {
        canonical: "/about",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
