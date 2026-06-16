import { motion } from 'framer-motion';
import { formatCategoryLabel } from '../../utils/filters';

function SpecRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 border-b border-default py-3 last:border-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-right text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

export default function ProductSpecifications({ product }) {
  const dimensions = product.dimensions
    ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
    : null;

  const specs = [
    { label: 'Category', value: formatCategoryLabel(product.category) },
    { label: 'Brand', value: product.brand },
    { label: 'SKU', value: product.sku || String(product.id) },
    { label: 'Weight', value: product.weight ? `${product.weight} g` : null },
    { label: 'Dimensions', value: dimensions },
    { label: 'Availability', value: product.availabilityStatus },
    { label: 'Min. order', value: product.minimumOrderQuantity ? `${product.minimumOrderQuantity} units` : null },
    { label: 'Warranty', value: product.warrantyInformation },
    { label: 'Shipping', value: product.shippingInformation },
    { label: 'Returns', value: product.returnPolicy },
  ].filter((s) => s.value);

  if (specs.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 border-t border-default pt-10"
    >
      <h2 className="heading-md mb-6">Specifications</h2>
      <dl className="rounded-2xl border border-default bg-surface p-4 sm:p-6">
        {specs.map((spec) => (
          <SpecRow key={spec.label} {...spec} />
        ))}
      </dl>
    </motion.section>
  );
}
