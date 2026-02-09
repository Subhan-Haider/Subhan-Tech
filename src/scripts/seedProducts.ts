import { SOFTWARE, EXTENSIONS } from "../data/config";
import { productService, Product } from "../lib/services/products";

export const seedDatabase = async () => {
    console.log("Starting seed...");

    try {
        // Seed Software
        for (const soft of SOFTWARE) {
            const product: Omit<Product, "id"> = {
                name: soft.name,
                description: soft.description,
                url: soft.url,
                category: soft.category,
                type: "software",
                status: "Live",
                featured: false,
                trending: false,
            };
            await productService.create(product);
            console.log(`Seeded software: ${soft.name}`);
        }

        // Seed Extensions
        for (const ext of EXTENSIONS) {
            const product: Omit<Product, "id"> = {
                name: ext.name,
                description: ext.description,
                url: ext.url,
                category: "Extension",
                type: "extension",
                status: "Live",
                platform: ext.platform,
                featured: false,
                trending: false,
            };
            await productService.create(product);
            console.log(`Seeded extension: ${ext.name}`);
        }

        console.log("Seed completed successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};
