import { collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface SystemEvent {
    id?: string;
    type: "view" | "download" | "install" | "uninstall" | "click";
    productId: string;
    productName: string;
    userAgent?: string;
    timestamp: string;
    metadata?: any;
}

const COLLECTION = "system_events";

export const eventService = {
    async log(event: Omit<SystemEvent, "id" | "timestamp">) {
        await addDoc(collection(db, COLLECTION), {
            ...event,
            timestamp: new Date().toISOString(),
            userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "ssr"
        });
    },

    async getRecent(count: number = 100) {
        const q = query(collection(db, COLLECTION), orderBy("timestamp", "desc"), limit(count));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SystemEvent));
    }
};
