import {
    collection, addDoc, updateDoc, doc,
    getDocs, getDoc, query, orderBy
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ExtensionProfile {
    id?: string;
    name: string;
    chromeId: string; // The long ID from Chrome Store
    status: "active" | "disabled";
    surveyId?: string;
    privacyPageId?: string;
    urls: {
        install?: string;
        survey?: string;
        update?: string;
        uninstall?: string;
    };
    createdAt: string;
    updatedAt: string;
}

const COLLECTION = "extension_profiles";

export const extensionService = {
    async getAll() {
        const q = query(collection(db, COLLECTION), orderBy("updatedAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ExtensionProfile));
    },

    async getById(id: string) {
        const docRef = doc(db, COLLECTION, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as ExtensionProfile) : null;
    },

    async create(data: Omit<ExtensionProfile, "id" | "createdAt" | "updatedAt">) {
        const now = new Date().toISOString();
        const docRef = await addDoc(collection(db, COLLECTION), {
            ...data,
            createdAt: now,
            updatedAt: now
        });
        return docRef.id;
    },

    async update(id: string, data: Partial<ExtensionProfile>) {
        const docRef = doc(db, COLLECTION, id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString()
        });
    }
};
