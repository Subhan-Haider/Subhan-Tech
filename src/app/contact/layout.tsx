import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Subhan for collaborations, custom solutions, or open-source inquiries.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
