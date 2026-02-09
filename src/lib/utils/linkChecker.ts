export async function checkLink(url: string): Promise<{ ok: boolean, status: number, error?: string }> {
    try {
        const response = await fetch(url, { method: "HEAD", cache: "no-store" });
        return { ok: response.ok, status: response.status };
    } catch (error: unknown) {
        return { ok: false, status: 0, error: (error as Error).message };
    }
}

export async function checkAssetManifest(productId: string, assets: { url: string; id: string; label: string }[]): Promise<{ productId: string, results: unknown[] }> {
    const results = await Promise.all(assets.map(async (asset) => {
        const result = await checkLink(asset.url);
        return { assetId: asset.id, label: asset.label, ...result };
    }));
    return { productId, results };
}
