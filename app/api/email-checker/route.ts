import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  console.log("email checke route running");

  const emails = await req.json();

  console.log("route data", emails);

  // this api is limited to 10/day, 250 a month
  // i am waiting from an api key from emailrep.io
  // given above limit, i should reserve this check for highly sus emails?
  //   and do some domain name validation before hand?
  const firstEmail = emails[0];
  const emailRepResult = await fetch(`https://emailrep.io/${firstEmail}`).then(
    (res) => res.json(),
  );

  console.log(emailRepResult);

  return NextResponse.json({ body: "basic response" });
};
