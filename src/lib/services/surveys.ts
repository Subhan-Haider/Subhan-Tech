import {
    collection, addDoc, updateDoc, doc,
    getDocs, getDoc, query, where, orderBy
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type QuestionType = "text" | "multiple-choice" | "yes-no" | "rating" | "checkbox";

export interface Question {
    id: string;
    type: QuestionType;
    text: string;
    options?: string[]; // For multiple-choice/checkbox
    required: boolean;
    logic?: {
        showIf?: {
            questionId: string;
            equals: string;
        };
    };
}

export interface Survey {
    id?: string;
    extensionId: string;
    title: string;
    description?: string;
    isActive: boolean;
    version: string;
    questions: Question[];
    redirectUrl?: string; // After completion
    createdAt: string;
    updatedAt: string;
}

export interface SurveyResponse {
    id?: string;
    surveyId: string;
    extensionId: string;
    answers: Record<string, any>;
    timestamp: string;
    metadata: {
        userAgent: string;
        version: string;
    };
}

const COLLECTION = "surveys";
const RESPONSES = "survey_responses";

export const surveyService = {
    async getSurveysByExtension(extensionId: string) {
        const q = query(collection(db, COLLECTION), where("extensionId", "==", extensionId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Survey));
    },

    async getSurvey(id: string) {
        const docRef = doc(db, COLLECTION, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Survey) : null;
    },

    async createSurvey(data: Omit<Survey, "id" | "createdAt" | "updatedAt">) {
        const now = new Date().toISOString();
        const docRef = await addDoc(collection(db, COLLECTION), {
            ...data,
            createdAt: now,
            updatedAt: now
        });
        return docRef.id;
    },

    async updateSurvey(id: string, data: Partial<Survey>) {
        const docRef = doc(db, COLLECTION, id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString()
        });
    },

    async submitResponse(data: Omit<SurveyResponse, "id" | "timestamp">) {
        return await addDoc(collection(db, RESPONSES), {
            ...data,
            timestamp: new Date().toISOString()
        });
    },

    async getAllResponses() {
        const q = query(collection(db, RESPONSES), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SurveyResponse));
    }
};
