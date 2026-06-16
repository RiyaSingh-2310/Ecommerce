import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import IconButton from '../ui/IconButton';
import MobileSearchBar from './MobileSearchBar';

export default function MobileSearchTrigger({ defaultQuery, onSearch }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultQuery);

  const openSearch = useCallback(() => {
    setValue(defaultQuery);
    setOpen(true);
  }, [defaultQuery]);

  const closeSearch = useCallback(() => {
    setOpen(false);
    setValue(defaultQuery);
  }, [defaultQuery]);

  const handleSearch = useCallback((query) => {
    onSearch(query);
    setOpen(false);
  }, [onSearch]);

  return (
    <>
      <IconButton
        label="Open search"
        variant="header"
        className="md:hidden"
        onClick={openSearch}
      >
        <Search className="h-5 w-5" />
      </IconButton>

      <MobileSearchBar
        open={open}
        value={value}
        onChange={setValue}
        onClose={closeSearch}
        onSearch={handleSearch}
      />
    </>
  );
}
