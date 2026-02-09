import { redirectService } from "@/lib/services/redirects";
import { redirect, notFound } from "next/navigation";

export default async function GoRedirect({ params }: { params: { slug: string } }) {
    const link = await redirectService.getBySlug(params.slug);

    if (!link) {
        notFound();
    }

    // Fire and forget click tracking
    redirectService.recordClick(link.id!).catch(console.error);

    // Perform redirect
    redirect(link.targetUrl);

    return null;
}
