import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  console.log("email checke route running");

  const emails = await req.json();

  console.log("route data", emails);

  // this api is limited to 10/day, 250 a month
  // i am waiting from an api key from emailrep.io
  // given above limit, i should reserve this check for highly sus emails?
  //   and do some domain name validation before hand?
  // const firstEmail = emails[0];
  // const emailRepResult = await fetch(`https://emailrep.io/${firstEmail}`).then(
  //   (res) => res.json(),
  // );

  const emailRepResult = await Promise.all(
    emails.map(async (email: string) => {
      return await fetch(`https://emailrep.io/${email}`).then((res) =>
        res.json(),
      );
    }),
  );
  console.log(emailRepResult);
  // for domain name checker; what do i want to do?

  // filter out all the hotmail gmail etc
  // i think i have to send a request for each email / check.
  // so something like
  // tell the user that we are submitting requests 1 by 1.
  // map over emails array
  // for each email, send a request and return a promise?
  // where exactly would the result look like?

  // ideally i think its in an array, each array item is the result of the api call
  // then let the client read the array and render the results pretty?

  return NextResponse.json({
    body: {
      emailRep: emailRepResult,
    },
  });
};
