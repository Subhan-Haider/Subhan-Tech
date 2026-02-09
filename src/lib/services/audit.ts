import {
    collection, addDoc, getDocs, query, orderBy, limit
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface AuditLog {
    id?: string;
    adminId: string;
    adminName: string;
    action: string; // e.g., "CREATE_PRODUCT", "UPDATE_REDIRECT"
    targetId: string;
    targetName: string;
    details: string;
    timestamp: string;
}

const COLLECTION = "audit_logs";

export const auditService = {
    async log(adminId: string, adminName: string, action: string, targetId: string, targetName: string, details: string) {
        await addDoc(collection(db, COLLECTION), {
            adminId,
            adminName,
            action,
            targetId,
            targetName,
            details,
            timestamp: new Date().toISOString()
        });
    },

    async getRecent(count: number = 50) {
        const q = query(collection(db, COLLECTION), orderBy("timestamp", "desc"), limit(count));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AuditLog));
    }
};
