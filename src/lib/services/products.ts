import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type ProductType = "software" | "extension" | "app" | "website";
export type ProductStatus = "Live" | "Beta" | "Coming Soon" | "Archived";
export type AssetType = "exe" | "zip" | "url" | "source" | "docs";

export interface ProductAsset {
    id: string;
    type: AssetType;
    label: string;
    url: string;
    version?: string;
    size?: string;
    active: boolean;
    downloadCount?: number;
}

export interface Product {
    id?: string;
    name: string;
    slug: string;
    description: string;
    longDescription?: string;
    url: string;
    category: string;
    type: ProductType;
    status: ProductStatus;
    featured?: boolean;
    pinned?: boolean;
    section?: string; // e.g. "Main Registry", "Experimental"

    // Media
    icon?: string;
    images?: string[];
    videoUrl?: string;

    // Rich Data
    features?: string[];
    tags?: string[];

    // Assets & Files
    assets?: ProductAsset[];

    // Metadata (Dynamic based on type)
    meta?: {
        // Extension Specific
        chromeId?: string;
        surveyUrl?: string; // External if needed, otherwise internal linked via ID
        surveyId?: string;
        privacyPageId?: string;
        redirectUrls?: {
            install?: string;
            update?: string;
            uninstall?: string;
        };

        // Software/Extension Specific
        platforms?: ("windows" | "mac" | "linux" | "web" | "chrome" | "edge" | "firefox")[];
        requirements?: string;
        pricing?: string;
        license?: string;
        privacyPolicy?: string;
        termsOfService?: string;
        stagedRollout?: number; // 0-100 percentage
        badges?: ("New" | "Popular" | "Updated" | "Beta")[];
        changelog?: string;
    };
    downloadCount?: number;

    version?: string;
    lastUpdated?: string;
    createdAt?: string;
}

const COLLECTION_NAME = "products";

export const productService = {
    async getAll() {
        const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    },

    async getById(id: string) {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Product;
        }
        return null;
    },

    async getByType(type: "software" | "extension") {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("type", "==", type),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    },

    async create(product: Omit<Product, "id">) {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...product,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
        });
        return docRef.id;
    },

    async update(id: string, product: Partial<Product>) {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            ...product,
            lastUpdated: new Date().toISOString(),
        });
    },

    async delete(id: string) {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
    },

    async recordAssetDownload(productId: string, assetId: string) {
        const docRef = doc(db, COLLECTION_NAME, productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const product = docSnap.data() as Product;
            const assets = product.assets?.map(a => {
                if (a.id === assetId) {
                    return { ...a, downloadCount: (a.downloadCount || 0) + 1 };
                }
                return a;
            });
            await updateDoc(docRef, { assets });
        }
    }
};
