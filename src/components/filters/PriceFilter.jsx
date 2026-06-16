import { useState, useEffect, useRef } from 'react';

const DEBOUNCE = 400;

export default function PriceFilter({ initialMin, initialMax, onCommit, error }) {
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const schedule = (nextMin, nextMax) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => onCommit(nextMin, nextMax), DEBOUNCE);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label htmlFor="filter-min" className="mb-1.5 block text-xs font-medium text-muted">
          Min
        </label>
        <input
          id="filter-min"
          type="number"
          min="0"
          step="0.01"
          value={min}
          onChange={(e) => {
            setMin(e.target.value);
            schedule(e.target.value, max);
          }}
          placeholder="0"
          className="input-field h-10 w-full rounded-xl px-3 text-sm"
        />
      </div>
      <div>
        <label htmlFor="filter-max" className="mb-1.5 block text-xs font-medium text-muted">
          Max
        </label>
        <input
          id="filter-max"
          type="number"
          min="0"
          step="0.01"
          value={max}
          onChange={(e) => {
            setMax(e.target.value);
            schedule(min, e.target.value);
          }}
          placeholder="Any"
          className="input-field h-10 w-full rounded-xl px-3 text-sm"
        />
      </div>
      {error && (
        <p className="col-span-2 text-xs text-error" role="alert">{error}</p>
      )}
    </div>
  );
}
