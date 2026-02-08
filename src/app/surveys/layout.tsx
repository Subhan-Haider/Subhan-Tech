import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Surveys",
    description: "Participate in research and provide feedback on Subhan's extensions and tools.",
    alternates: {
        canonical: "/surveys",
    },
};

export default function SurveysLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
