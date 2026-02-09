import {
    collection, addDoc, updateDoc, deleteDoc, doc,
    getDocs, query, orderBy
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface HomeSection {
    id?: string;
    title: string;
    description: string;
    order: number;
    visible: boolean;
    type: "grid" | "list" | "featured";
    productType?: "software" | "extension" | "app" | "website" | "all";
}

const COLLECTION = "home_sections";

export const sectionService = {
    async getAll() {
        const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HomeSection));
    },

    async create(data: Omit<HomeSection, "id">) {
        const docRef = await addDoc(collection(db, COLLECTION), data);
        return docRef.id;
    },

    async update(id: string, data: Partial<HomeSection>) {
        const docRef = doc(db, COLLECTION, id);
        await updateDoc(docRef, data);
    },

    async delete(id: string) {
        const docRef = doc(db, COLLECTION, id);
        await deleteDoc(docRef);
    }
};
