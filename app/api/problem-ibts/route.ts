import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: Request) => {
  console.log(req.body);

  if (!req.body) {
    return NextResponse.json({ error: "no body", status: 400 });
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const base64Encoded = btoa(
    `${process.env.ZEN_USER}/token:${process.env.ZEN_TOKEN}`,
  );

  myHeaders.append("Authorization", `Basic ${base64Encoded}`);

  const raw = JSON.stringify({
    tickets: [
      {
        comment: {
          body: "TEST from next form at " + Date(),
        },
        subject: "TEST from next",
        tags: ["of_todo", "TEST", "problem_ibt"],
        custom_fields: [{ id: "7565917494287", value: "22222" }],
      },
    ],
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // const result = await fetch(
  //   "https://paddypallin.zendesk.com/api/v2/tickets/create_many",
  //   requestOptions,
  // )
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));

  // return NextResponse.json(result);

  return NextResponse.json({ message: "no worky", bod: req.body });
};

export const GET = async (req: Request) => {
  console.log(process.env.ZEN_USER);
  console.log(req.body);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const base64Encoded = btoa(
    `${process.env.ZEN_USER}/token:${process.env.ZEN_TOKEN}`,
  );

  myHeaders.append("Authorization", `Basic ${base64Encoded}`);

  const raw = JSON.stringify({
    tickets: [
      {
        comment: {
          body: "TEST from next form at " + Date(),
        },
        subject: "TEST from next",
        tags: ["of_todo", "TEST", "problem_ibt"],
        custom_fields: [{ id: "7565917494287", value: "22222" }],
      },
    ],
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const result = await fetch(
    "https://paddypallin.zendesk.com/api/v2/tickets/create_many",
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  return NextResponse.json({ data: result });
};
