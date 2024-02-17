"use client";
import React, { useState } from "react";

type item = {
  id: number;
  quantity: string;
  sku: string;
  description: string;
};

function StoreRequstForm() {
  const [requestItems, setRequestItems] = useState<item[]>([
    {
      id: Date.now(),
      quantity: "",
      sku: "",
      description: "",
    },
  ]);

  const [deliveryMethod, setDeliveryMethod] = useState("store");
  const [customerName, setCustomerName] = useState<string>();
  const [customerPhone, setCustomerPhone] = useState<string>();
  const [customerEmail, setCustomerEmail] = useState<string>();
  const [customerAddress, setCustomerAddress] = useState<string>();

  function addMoreItems(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setRequestItems([
      ...requestItems,
      { id: Date.now(), quantity: "", sku: "", description: "" },
    ]);
  }

  function removeSingleItem(
    e: React.MouseEvent<HTMLButtonElement>,
    item: item,
  ) {
    e.preventDefault();
    const newState = requestItems.filter((el, index) => {
      return item.id !== el.id;
    });
    setRequestItems(newState);
  }

  function handleItemChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    index: number,
  ) {
    const newStateArray = requestItems.map((el) => {
      if (el.id === id) {
        return { ...requestItems[index], [e.target.name]: e.target.value };
      } else {
        return el;
      }
    });

    setRequestItems(newStateArray);
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("subt mit clicked");
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
      <form onSubmit={(e) => submitForm(e)}>
        <div>
          <h2>Customer Details</h2>
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            name="customerName"
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
          />
          <label htmlFor="customerPhone">Customer Phone</label>
          <input
            type="text"
            name="customerPhone"
            onChange={(e) => setCustomerPhone(e.target.value)}
            value={customerPhone}
          />
          <label htmlFor="customerEmail">Customer Email</label>
          <input
            type="text"
            name="customerEmail"
            onChange={(e) => setCustomerEmail(e.target.value)}
            value={customerEmail}
          />
        </div>
        <div>
          <h2>Item details</h2>
          {requestItems.map((item, index) => (
            <div key={item.id}>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(e, item.id, index)}
              />
              <label htmlFor="sku">SKU</label>
              <input
                type="text"
                value={item.sku}
                onChange={(e) => handleItemChange(e, item.id, index)}
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleItemChange(e, item.id, index)}
              />
              <button onClick={(e) => removeSingleItem(e, item)}>
                Remove item
              </button>
            </div>
          ))}
          <button onClick={(e) => addMoreItems(e)}>Add more items</button>
        </div>
        <div>
          <h2>Direct to customer or store?</h2>
          <label htmlFor="deliveryChooser">
            Where should the product be sent to?
          </label>
          <select
            name="deliveryChooser"
            id="deliveryChooser"
            onChange={(e) => {
              setDeliveryMethod(e.target.value);
            }}
          >
            <option value="store">Store</option>
            <option value="customerAddress">Customer Address</option>
          </select>
          {deliveryMethod === "store" ? (
            <p>Sending product to your store</p>
          ) : (
            <div>
              <label htmlFor="customerAddress">Customer Address</label>
              <textarea
                name="customerAddress"
                id="customerAddress"
                cols={30}
                rows={5}
                onChange={(e) => setCustomerAddress(e.target.value)}
                value={customerAddress}
              ></textarea>
            </div>
          )}
        </div>
        <button>Send request </button>
      </form>
    </div>
  );
}

export default StoreRequstForm;
