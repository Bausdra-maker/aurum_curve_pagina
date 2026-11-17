import { ProductCatalog } from "@/components/product-catalog";
import { fetchProducts } from "@/lib/api";

export const metadata = { title: "Catálogo · Aurum Curve" };

export default async function CatalogoPage() {
  const { products, error } = await fetchProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {error ? (
        <div role="alert" className="rounded-2xl border border-destructive/40 bg-card p-8 text-center">
          <h1 className="font-serif text-3xl font-medium">No pudimos cargar el catálogo</h1>
          <p className="mt-2 text-muted-foreground">{error}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Verificá que el backend esté corriendo con el perfil <code>local</code> en el puerto 8080.
          </p>
        </div>
      ) : (
        <ProductCatalog products={products} />
      )}
    </div>
  );
}
