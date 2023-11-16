import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: Request) => {
  console.log("post request starting on route");

  if (!req.body) {
    return NextResponse.json({ error: "no body", status: 400 });
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const base64Encoded = btoa(
    `${process.env.ZEN_USER}/token:${process.env.ZEN_TOKEN}`,
  );

  myHeaders.append("Authorization", `Basic ${base64Encoded}`);

  const ticketPayload = await req.json().then((req) =>
    req.ibts.map((ibt: string) => ({
      assignee_email: "customerservice@paddypallin.com.au",
      comment: {
        body: `
        There is an issue with this IBT ${ibt}. issue was found by ${
          req.author
        }.
        

        Sent from next at ${Date()}`,
      },
      subject: `IBT with a problem: IBT no ${ibt}`,
      tags: ["of_todo", "problem_ibt"],
      custom_fields: [{ id: "7565917494287", value: ibt }],
    })),
  );

  const raw = JSON.stringify({ tickets: ticketPayload });

  console.log("tcket payload", ticketPayload);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    return await fetch(
      "https://paddypallin.zendesk.com/api/v2/tickets/create_many",
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        return NextResponse.json({
          message: "request sent to zendesk",
          body: result,
        });
      });
  } catch (error) {
    console.error("error with making post request to zendesk", error);
    return error;
  }
};
