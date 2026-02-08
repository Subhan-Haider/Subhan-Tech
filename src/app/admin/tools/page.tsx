"use client";

import { CRUDTable } from "@/components/admin/CRUDTable";
import { TOOLS } from "@/data/config";

export default function AdminTools() {
    return (
        <CRUDTable
            title="Tactical Tools"
            subtitle="Manage micro-utilities and focused neural workflows."
            items={TOOLS.map(t => ({ ...t, url: '#' }))}
            typeLabel="Tool"
            onAdd={(item) => console.log("Add tool:", item)}
            onEdit={(i, item) => console.log("Edit tool:", i, item)}
            onDelete={(i) => console.log("Delete tool:", i)}
        />
    );
}
