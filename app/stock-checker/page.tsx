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

  const [storeStockLevels, setStoreStockLevels] = useState<store[]>();

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
    <div className=" ">
      <div className="flex flex-col items-center">
        <div className="landing-background opacity-25" />
        <p className="text-lg pt-40">
          Input a sku to check which stores have stock
        </p>
        <form onSubmit={(e) => checkSku(e)} className="">
          <label className="text-lg" htmlFor="sku">
            SKU{" "}
          </label>
          <input
            className="border border-black m-3 rounded-sm pl-2"
            type="text"
            name="sku"
            onChange={(e) => {
              setSku(e.target.value);
            }}
          />
          <button className="rounded-md bg-indigo-600 mb-6 px-1 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Get Stock Levels
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center ">
        <h1 className="text-xl font-bold">Results</h1>

        {storeStockLevels && storeStockLevels.length > 0 ? (
          <div className="grid grid-cols-2 w-1/4 text-center ">
            <h3 className="font-bold">Store Name</h3>
            <h3 className="font-bold">Quantity</h3>
            {storeStockLevels.map((store) => (
              <>
                <p key={store.name}>{store.name}</p>
                <p key={store.name + store.quantity}>{store.quantity}</p>
              </>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default StockChecker;
