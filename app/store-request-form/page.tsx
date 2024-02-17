"use client";
import { useState } from "react";

function StoreRequstForm() {
  const [requestItems, setRequestItems] = useState([{ id: Date.now() }]);

  function addMoreItems(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setRequestItems([...requestItems, { id: Date.now() }]);
  }

  function removeSingleItem(e, item) {
    e.preventDefault();
    const newState = requestItems.filter((el, index) => {
      console.log("filter run count", index);
      // filter out item that equals the item passed in
      console.log("el id", el.id);
      console.log("item", item.id);
      return item.id !== el.id;
    });
    setRequestItems(newState);
  }

  return (
    <div>
      <h1>store request form</h1>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, corporis
        natus accusamus voluptatem minima unde exercitationem nesciunt placeat
        perspiciatis atque, neque vero provident ratione magni? Perferendis iste
        voluptates placeat ex!
      </div>
      <form action="">
        <div>
          <h2>Item details</h2>
          {requestItems.map((item, index) => (
            <div key={item.id}>
              <label htmlFor="quantity">Quantity</label>
              <input type="text" />

              <label htmlFor="sku">SKU</label>
              <input type="text" />

              <label htmlFor="description">Description</label>

              <input type="text" />
              <button onClick={(e) => removeSingleItem(e, item)}>
                Remove item
              </button>
            </div>
          ))}
          <button onClick={(e) => addMoreItems(e)}>Add more items</button>
        </div>
      </form>
    </div>
  );
}

export default StoreRequstForm;
