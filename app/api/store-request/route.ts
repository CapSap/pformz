import { NextResponse } from "next/server";

import { postStoreRequest } from "@/app/_utils/serverActions";

export const POST = async (req: Request) => {
  const storeRequest = await req.json();

  if (!req.body) {
    return NextResponse.json({ error: "no body", status: 400 });
  }

  const queryString = `
  WITH request_insert as (
    INSERT INTO store_request (customername, customerphone, customeremail, deliverymethod, customeraddress, requestingstore, requeststatus)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    RETURNING id
    )
   INSERT INTO items (itemSku, itemName, itemQuantiy, requestID)
   VALUES () 
   
`;
  /*   WITH first_insert AS (
      INSERT INTO first_table (column1, column2, ...)
      VALUES (value1, value2, ...)
      RETURNING id
      )
      INSERT INTO second_table (first_table_id, column1, column2, ...)
      SELECT id, value1, value2, ...
      FROM first_insert;
      `;
*/

  const queryParams = [
    storeRequest.customerName,
    storeRequest.customerPhone,
    storeRequest.customerEmail,
    storeRequest.deliveryMethod,
    storeRequest.customerAddress,
    storeRequest.requestingStore,
    storeRequest.requestStatus,
    storeRequest.items,
  ];

  const dataBaseResponse = await postStoreRequest(queryString, queryParams);

  return NextResponse.json({
    body: { dataBaseResponse },
  });
};
