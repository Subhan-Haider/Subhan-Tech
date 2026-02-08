"use client";

import { CRUDTable } from "@/components/admin/CRUDTable";
import { SOFTWARE } from "@/data/config";

export default function AdminSoftware() {
    const handleAdd = (newItem: any) => {
        console.log("Adding new software:", newItem);
        // In production, this would save to a database
        alert(`Added: ${newItem.name}`);
    };

    const handleEdit = (index: number, editedItem: any) => {
        console.log("Editing software at index", index, editedItem);
        alert(`Updated: ${editedItem.name}`);
    };

    const handleDelete = (index: number) => {
        console.log("Deleting software at index", index);
        alert("Item deleted successfully");
    };

    return (
        <CRUDTable
            title="Software Assets"
            subtitle="Manage your standalone applications and system tools."
            items={SOFTWARE}
            typeLabel="Software"
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
}
