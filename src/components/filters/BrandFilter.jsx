export default function BrandFilter({ brands, selected, onToggle }) {
  if (brands.length === 0) {
    return <p className="text-sm text-muted">No brands in this category.</p>;
  }

  return (
    <fieldset>
      <legend className="sr-only">Brands</legend>
      <ul className="max-h-52 space-y-0.5 overflow-y-auto scrollbar-thin">
        {brands.map((brand) => {
          const id = `brand-${brand.replace(/\W/g, '-').toLowerCase()}`;
          const checked = selected.includes(brand);

          return (
            <li key={brand}>
              <label
                htmlFor={id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-sm transition-colors ${
                  checked ? 'bg-accent-soft text-accent' : 'hover:bg-canvas'
                }`}
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(brand)}
                  className="h-4 w-4 rounded border-line text-accent focus:ring-accent/30"
                />
                <span>{brand}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
