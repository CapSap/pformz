"use client";

import { ChangeEvent, useState } from "react";
import { submitIbts } from "../_utils/serverActions";

function ProblemIbtForm({
  existingTickets,
}: {
  existingTickets: { ticket_id: number; problem_ibt: string }[];
}) {
  const [ibts, setIbts] = useState<string[]>();

  function handleUpdate(e: ChangeEvent<HTMLTextAreaElement>) {
    // remove whitespace at start and end to prevent empty string element in array
    // split at whitespaces
    setIbts(e.target.value.trim().split(/\s+/));
  }

  const ibtsToBeSentToZendesk = ibts?.filter((ibt) => {
    // filter out exist ibts and make them pass 5 digit no check
    return (
      !existingTickets.some((ticket) => ticket.problem_ibt === ibt) &&
      ibt.match(/\b\d{5}\b/g)
    );
  });

  return (
    <form action={submitIbts} className="flex flex-col justify-center m-12">
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
      ></input>

      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Send problem ibts to zendesk
      </button>
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
