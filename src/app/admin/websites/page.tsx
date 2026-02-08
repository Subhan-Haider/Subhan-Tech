"use client";

import { CRUDTable, Item } from "@/components/admin/CRUDTable";
import { WEBSITES } from "@/data/config";
import { useState } from "react";

export default function AdminWebsites() {
    const [items, setItems] = useState<Item[]>(WEBSITES);

    return (
        <CRUDTable
            title="Personal Directory"
            subtitle="Manage your connected websites and external links."
            items={items}
            typeLabel="Website"
            onAdd={(item) => setItems([...items, item])}
            onDelete={(i) => setItems(items.filter((_, idx) => idx !== i))}
        />
    );
}
