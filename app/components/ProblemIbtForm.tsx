"use client";

import { ChangeEvent, useState } from "react";
import { submitIbts } from "../_utils/serverActions";

function ProblemIbtForm({
  existingTickets,
}: {
  existingTickets: { ticket_id: number; problem_ibt: string }[];
}) {
  const [ibts, setIbts] = useState<string[]>([]);

  function handleUpdate(e: ChangeEvent<HTMLTextAreaElement>) {
    setIbts(e.target.value.trim().split(/\s+/));
    console.log(e.target.value.trim().split(/\s+/));
  }

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
        <p>Ibts that will be sent to zendesk</p>
        {ibts.map((ibt, i) => (
          <div key={ibt + i}>{ibt}</div>
        ))}
      </div>
    </form>
  );
}

export default ProblemIbtForm;
