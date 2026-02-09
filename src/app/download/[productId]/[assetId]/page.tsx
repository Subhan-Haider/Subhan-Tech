import { productService } from "@/lib/services/products";
import { eventService } from "@/lib/services/events";
import { redirect, notFound } from "next/navigation";

export default async function DownloadGateway({
    params
}: {
    params: { productId: string, assetId: string }
}) {
    const product = await productService.getById(params.productId);

    if (!product || !product.assets) {
        notFound();
    }

    const asset = product.assets.find(a => a.id === params.assetId);

    if (!asset) {
        notFound();
    }

    // Fire and forget tracking
    productService.recordAssetDownload(params.productId, params.assetId).catch(console.error);
    eventService.log({
        type: "download",
        productId: params.productId,
        productName: product.name,
        metadata: { assetId: params.assetId, assetLabel: asset.label }
    }).catch(console.error);

    // Perform redirect to actual file/resource
    redirect(asset.url);

    return null;
}
