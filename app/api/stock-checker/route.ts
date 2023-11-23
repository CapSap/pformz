import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  console.log("stock check get");

  const userInput = await req.json();

  if (!req.body) {
    return NextResponse.json({ error: "no body", status: 400 });
  }

  console.log("sku from req", userInput.sku);

  const stockLevels = await fetch(
    `https://www.paddypallin.com.au/pronto/instore/index?id=${userInput.sku}`,
    { method: "GET" },
  ).then((res) => res.text());

  return NextResponse.json({ body: stockLevels });
};
