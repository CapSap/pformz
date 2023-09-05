"use server";

const submitIbts = async (data: FormData) => {
  const ibts = await data.get("ibt");
  const author = await data.get("author");

  if (ibts === null || author === null) {
    throw new Error("ibt or author is null");
  }

  const ibtArray = ibts.toString().match(/[^\D\r\n]+/g);

  if (ibtArray === null) {
    throw new Error("No numbers found within the IBT text");
  }

  const ticketPayload = ibtArray.map((ibt) => {
    return {
      comment: {
        body: `There is an issue with this IBT ${ibt}. issue was found by ${author}. Sent from next at ${Date()}`,
      },
      subject: `TEST from web form IBT with a problem: IBT no ${ibt}`,
      tags: ["of_todo", "problem_ibt"],
      custom_fields: [{ id: "7565917494287", value: ibt }],
    };
  });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const base64Encoded = btoa(
    `${process.env.ZEN_USER}/token:${process.env.ZEN_TOKEN}`,
  );

  myHeaders.append("Authorization", `Basic ${base64Encoded}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ tickets: ticketPayload }),
    redirect: "follow",
  };

  const result = await fetch(
    "https://paddypallin.zendesk.com/api/v2/tickets/create_many",
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  return result;
};

export default submitIbts;
