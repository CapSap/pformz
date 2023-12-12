import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  console.log("email checke route running");

  const emails = await req.json();

  console.log("route data", emails);

  return NextResponse.json({ body: "basic response" });
};
