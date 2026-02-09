export async function checkLink(url: string): Promise<{ ok: boolean, status: number, error?: string }> {
    try {
        const response = await fetch(url, { method: "HEAD", cache: "no-store" });
        return { ok: response.ok, status: response.status };
    } catch (error: any) {
        return { ok: false, status: 0, error: error.message };
    }
}

export async function checkAssetManifest(productId: string, assets: any[]): Promise<{ productId: string, results: any[] }> {
    const results = await Promise.all(assets.map(async (asset) => {
        const result = await checkLink(asset.url);
        return { assetId: asset.id, label: asset.label, ...result };
    }));
    return { productId, results };
}
