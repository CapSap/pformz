import { NextResponse } from "next/server";

import { postStoreRequest } from "@/app/_utils/serverActions";

export const POST = async (req: Request) => {
  const storeRequest = await req.json();

  if (!req.body) {
    return NextResponse.json({ error: "no body", status: 400 });
  }

  const queryString = `INSERT INTO store_request (customername, customerphone, customeremail, deliverymethod, customeraddress, requestingstore, requeststatus)
VALUES ($1, $2, $3, $4, $5, $6, $7);`;

  const queryParams = [
    storeRequest.customerName,
    storeRequest.customerPhone,
    storeRequest.customerEmail,
    storeRequest.deliveryMethod,
    storeRequest.customerAddress,
    storeRequest.requestingStore,
    storeRequest.requestStatus,
  ];

  const dataBaseResponse = await postStoreRequest(queryString, queryParams);

  return NextResponse.json({
    body: { dataBaseResponse },
  });
};
