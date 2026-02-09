import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface SystemConfig {
    lockdownMode: boolean;
    maintenanceMessage: string;
    lockdownRedirectUrl?: string;
    globalNotice?: string;
}

const COLLECTION = "system";
const CONFIG_DOC = "config";

export const systemService = {
    async getConfig() {
        const docRef = doc(db, COLLECTION, CONFIG_DOC);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? (docSnap.data() as SystemConfig) : { lockdownMode: false, maintenanceMessage: "System undergoing neural synchronization." };
    },

    async updateConfig(updates: Partial<SystemConfig>) {
        const docRef = doc(db, COLLECTION, CONFIG_DOC);
        await updateDoc(docRef, updates);
    },

    subscribe(callback: (config: SystemConfig) => void) {
        return onSnapshot(doc(db, COLLECTION, CONFIG_DOC), (doc) => {
            if (doc.exists()) {
                callback(doc.data() as SystemConfig);
            }
        });
    }
};
