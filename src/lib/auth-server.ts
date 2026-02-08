import { cookies } from "next/headers";
import { adminAuth } from "./firebase-admin";

export async function getAdminUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token")?.value;

    if (!token) {
        return null;
    }

    try {
        const decodedToken = await adminAuth.verifyIdToken(token);

        // Check if the user is the allowed admin email
        if (decodedToken.email !== process.env.ADMIN_EMAIL) {
            console.error("Unauthorized admin access attempt", decodedToken.email);
            return null;
        }

        return decodedToken;
    } catch (error) {
        console.error("Token verification failed", error);
        return null;
    }
}
