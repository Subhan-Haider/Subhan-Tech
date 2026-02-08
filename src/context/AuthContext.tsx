"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    User,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setCookie, deleteCookie } from "cookies-next";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isAdmin: false,
    signInWithGoogle: async () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                // Check if user is admin
                const adminEmail = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL;
                setIsAdmin(user.email === adminEmail);

                const token = await user.getIdToken();
                // Use the token in an HttpOnly cookie or standard cookie for server-side auth
                setCookie("admin-token", token, { maxAge: 60 * 60 * 24 * 7, path: "/" });
            } else {
                setUser(null);
                setIsAdmin(false);
                deleteCookie("admin-token", { path: "/" });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google sign in error", error);
        }
    };

    const logout = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Sign out error", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
