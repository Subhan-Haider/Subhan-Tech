import {
    collection, addDoc, updateDoc, doc,
    getDocs, query, where
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface LegalPage {
    id?: string;
    extensionId: string;
    type: "privacy" | "terms" | "cookie";
    slug: string;
    content: string; // Markdown
    config: {
        extensionName: string;
        companyName: string;
        contactEmail: string;
    };
    isActive: boolean;
    lastUpdated: string;
}

const COLLECTION = "legal_pages";

export const legalService = {
    async getPagesByExtension(extensionId: string) {
        const q = query(collection(db, COLLECTION), where("extensionId", "==", extensionId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LegalPage));
    },

    async getBySlug(slug: string) {
        const q = query(collection(db, COLLECTION), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as LegalPage;
    },

    async create(data: Omit<LegalPage, "id" | "lastUpdated">) {
        const docRef = await addDoc(collection(db, COLLECTION), {
            ...data,
            lastUpdated: new Date().toISOString()
        });
        return docRef.id;
    },

    async update(id: string, data: Partial<LegalPage>) {
        const docRef = doc(db, COLLECTION, id);
        await updateDoc(docRef, {
            ...data,
            lastUpdated: new Date().toISOString()
        });
    }
};
