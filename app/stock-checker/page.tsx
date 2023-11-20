"use client";

import { useState } from "react";

function StockChecker() {
  const [sku, setSku] = useState<string>();

  console.log(sku);

  return (
    <div>
      <p>Input a sku to check which stores have stock</p>
      <form>
        <label htmlFor="sku">SKU </label>
        <input
          type="text"
          name="sku"
          onChange={(e) => {
            setSku(e.target.value);
          }}
        />
        <button>Get Stock Levels</button>
      </form>
    </div>
  );
}

export default StockChecker;
