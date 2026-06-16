import { useState } from 'react';
import { Search } from 'lucide-react';
import Input from '../ui/Input';

export default function SearchBar({ defaultQuery = '', onSearch, className = '' }) {
  const [value, setValue] = useState(defaultQuery);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value);
      }}
      className={className}
    >
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search products, brands..."
          className="h-11 border-0 bg-surface-elevated pl-11 shadow-sm"
          aria-label="Search products"
        />
      </div>
    </form>
  );
}
