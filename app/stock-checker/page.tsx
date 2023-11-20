"use client";

import { useState } from "react";
import { StringLiteral } from "typescript";

type store = {
  name: string;
  instore: number;
  pickup: {};
  quantity: number;
  source_code: string;
  url: string;
};

function StockChecker() {
  const [sku, setSku] = useState<string>();

  const [storeStockLevels, setStoreStockLevels] = useState();

  async function checkSku(e) {
    e.preventDefault();
    const result = await fetch(`http://localhost:3000/api/stock-checker`, {
      method: "POST",
      body: JSON.stringify({ sku: sku }),
    })
      .then((res) => res.json())
      .then((res) => JSON.parse(res.body))
      .then((res) => setStoreStockLevels(res));

    console.log(result);
  }

  return (
    <div>
      <p>Input a sku to check which stores have stock</p>
      <form onSubmit={(e) => checkSku(e)}>
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
      <div>
        <h1>Results</h1>
        {storeStockLevels.map((store) => (
          <p>store{}</p>
        ))}
      </div>
    </div>
  );
}

export default StockChecker;
