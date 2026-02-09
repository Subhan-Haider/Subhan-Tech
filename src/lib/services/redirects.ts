import {
    collection, addDoc, updateDoc, deleteDoc, doc,
    getDocs, getDoc, query, where, orderBy
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface RedirectLink {
    id?: string;
    slug: string;
    targetUrl: string;
    extensionId?: string;
    type: "install" | "survey" | "update" | "uninstall" | "custom";
    clickCount: number;
    lastClicked?: string;
    createdAt: string;
}

const COLLECTION = "redirects";

export const redirectService = {
    async getAll() {
        const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RedirectLink));
    },

    async getBySlug(slug: string) {
        const q = query(collection(db, COLLECTION), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as RedirectLink;
    },

    async recordClick(id: string) {
        const docRef = doc(db, COLLECTION, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await updateDoc(docRef, {
                clickCount: (docSnap.data().clickCount || 0) + 1,
                lastClicked: new Date().toISOString()
            });
        }
    },

    async create(data: Omit<RedirectLink, "id" | "clickCount" | "createdAt">) {
        const docRef = await addDoc(collection(db, COLLECTION), {
            ...data,
            clickCount: 0,
            createdAt: new Date().toISOString()
        });
        return docRef.id;
    },

    async delete(id: string) {
        await deleteDoc(doc(db, COLLECTION, id));
    }
};
