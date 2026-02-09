import { productService } from "@/lib/services/products";
import { sectionService } from "@/lib/services/sections";
import { HomeClient } from "./HomeClient";

export default async function Home() {
  const [products, sections] = await Promise.all([
    productService.getAll(),
    sectionService.getAll()
  ]);

  return <HomeClient products={products} sections={sections} />;
}
