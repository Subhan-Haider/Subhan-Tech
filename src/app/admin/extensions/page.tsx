"use client";

import { CRUDTable } from "@/components/admin/CRUDTable";
import { EXTENSIONS } from "@/data/config";

export default function AdminExtensions() {
    return (
        <CRUDTable
            title="Browser Extensions"
            subtitle="Configure and monitor your custom extensions across platforms."
            items={EXTENSIONS.map(e => ({ ...e, category: e.platform }))}
            typeLabel="Extension"
            onAdd={(item) => console.log("Add extension:", item)}
            onEdit={(i, item) => console.log("Edit extension:", i, item)}
            onDelete={(i) => console.log("Delete extension:", i)}
        />
    );
}
