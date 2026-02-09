"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "subhan_tech_favorites";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
    }, []);

    const toggleFavorite = (productId: string) => {
        const next = favorites.includes(productId)
            ? favorites.filter(id => id !== productId)
            : [...favorites, productId];

        setFavorites(next);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    };

    const isFavorite = (productId: string) => favorites.includes(productId);

    return { favorites, toggleFavorite, isFavorite };
};
