"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { submitIbts } from "../_utils/serverActions";

function ProblemIbtForm({
  existingTickets,
}: {
  existingTickets: { ticket_id: number; problem_ibt: string }[];
}) {
  const [ibts, setIbts] = useState<string[]>();
  const [author, setAuthor] = useState<string>();
  const [requestStatus, setRequestStatus] = useState<any>(undefined);

  function handleUpdate(e: ChangeEvent<HTMLTextAreaElement>) {
    // remove whitespace at start and end to prevent empty string element in array
    // split at whitespaces
    setIbts(e.target.value.trim().split(/\s+/));
  }

  const ibtsToBeSentToZendesk = ibts?.filter((ibt) => {
    // filter out exist ibts and make them pass 7 digit number check
    return (
      !existingTickets.some((ticket) => ticket.problem_ibt === ibt) &&
      ibt.match(/\b\d{7}\b/g)
    );
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/problem-ibts", {
      method: "POST",
      body: JSON.stringify({ ibts: ibtsToBeSentToZendesk, author: author }),
    })
      .then((res) => res.json())
      .then((res) => JSON.parse(res.body))
      .then((res) => setRequestStatus(res));

    return;
  }

  console.log("req status state", requestStatus);

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      // action={submitIbts}
      className="flex flex-col justify-center m-12"
    >
      <label htmlFor="ibt">IBT: </label>
      <textarea
        className="border border-black"
        name="ibt"
        onChange={(e) => handleUpdate(e)}
      ></textarea>

      <label htmlFor="author">Your Name: </label>
      <input
        className="border border-black mb-3"
        required={true}
        name="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      ></input>

      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Send problem ibts to zendesk
      </button>
      {requestStatus?.job_status?.status === "queued" ? (
        <div>
          IBT sent to zendesk, check progress{" "}
          <a href={requestStatus?.job_status?.url}>here</a>
        </div>
      ) : null}
      <div>
        <p>Ibts that you have entered above</p>
        <p>IBTs in red will not be sent to zendesk</p>
        {ibts
          ? ibts.map((ibt, i) => (
              <div
                key={ibt + i}
                className={`${
                  ibt.match(/\b\d{7}\b/g) &&
                  existingTickets.find(
                    (ticket) => ticket.problem_ibt === ibt,
                  ) === undefined
                    ? "border-green-500 border-4"
                    : "border-red-700 border-4"
                } p-1 m-2
                  `}
              >
                {ibt}
                {existingTickets.find(
                  (ticket) => ticket.problem_ibt === ibt,
                ) === undefined
                  ? null
                  : " This problem IBT already exists in Zendesk, it won't be sent"}
              </div>
            ))
          : null}
      </div>
    </form>
  );
}

export default ProblemIbtForm;
