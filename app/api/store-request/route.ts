import { NextResponse } from "next/server";

import { query } from "@/app/_utils/serverActions";

import * as db from "@/app/_utils/db";

export const POST = async (req: Request) => {
  console.log("post to db attempt running");

  const storeRequest = await req.json();

  if (!req.body) {
    return NextResponse.json({ error: "no body", status: 400 });
  }

  console.log("log from route", storeRequest);

  //   const result = await db.query("SELECT * FROM store_request");

  //   console.log(result);

  // what should be in here?
  // how exactly should i make the post request?

  // in server action the connection to the db lives there.
  // so i feel like there should be post route at this address/folder
  // and it should access whatever is in the serverACtions file

  return NextResponse.json({
    body: { ...storeRequest, extra: "something extra from the route" },
  });
};
