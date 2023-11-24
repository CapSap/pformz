"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { submitIbts } from "../_utils/serverActions";

type RequestStatus = {
  job_status: {
    id: string;
    message: string;
    progress: number;
    status: string;
    url: string;
    total: number;
    results: [];
  };
};

function ProblemIbtForm({
  existingTickets,
}: {
  existingTickets: { ticket_id: number; problem_ibt: string }[];
}) {
  const [ibts, setIbts] = useState<string[]>();
  const [author, setAuthor] = useState<string>("");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>();
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleUpdate(e: ChangeEvent<HTMLTextAreaElement>) {
    // remove whitespace at start and end to prevent empty string element in array
    // split at whitespaces
    setIbts(e.target.value.trim().split(/\s+/));
  }

  const ibtsToBeSentToZendesk = [...new Set(ibts)]?.filter((ibt) => {
    // scrub out the duplicate ibts that user has inputted, but still send 1
    // filter out exist ibts and make them pass 7 digit number check
    return (
      !existingTickets.some((ticket) => ticket.problem_ibt === ibt) &&
      ibt.match(/\b\d{7}\b/g)
    );
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/problem-ibts", {
      method: "POST",
      body: JSON.stringify({ ibts: ibtsToBeSentToZendesk, author: author }),
    })
      .then((res) => res.json())
      .then((res) => JSON.parse(res.body))
      .then((res) => setRequestStatus(res));

    setFormSubmitted(true);
    return;
  }

  function isValidIBT(ibt: string): boolean {
    return /\b\d{7}\b/g.test(ibt);
  }

  function doesNotExistOnZendesk(ibt: string) {
    return !existingTickets.some((ticket) => ticket.problem_ibt === ibt);
  }

  function isUniqueIBT(ibt: string): boolean {
    // count every element in array that === ibt, then return count > 1
    let count = 0;
    ibts?.forEach((el) => {
      if (el === ibt) {
        count++;
      }
    });
    // if ibt is unique, then count should be 1
    // if ibt is not unique, then count should be > 1
    return count === 1;
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      // action={submitIbts}
      className="flex flex-col justify-center items-center pt-20 text-lg"
    >
      <label htmlFor="ibt" className="mb-1">
        IBT(s)
      </label>
      <textarea
        className="border border-black resize w-1/5 h-24 rounded-sm p-2 mb-4"
        name="ibt"
        onChange={(e) => {
          setRequestStatus(undefined);
          handleUpdate(e);
        }}
        required={true}
      ></textarea>

      <label htmlFor="author" className="mb-1">
        Your Name
      </label>
      <input
        className="border border-black mb-3 rounded-sm "
        required={true}
        name="author"
        value={author}
        onChange={(e) => {
          setRequestStatus(undefined);
          setAuthor(e.target.value);
        }}
      ></input>

      <button
        type="submit"
        className="rounded-md bg-indigo-600 mb-6 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        disabled={formSubmitted}
      >
        Send problem ibts to zendesk
      </button>
      {requestStatus?.job_status?.status === "queued" ? (
        <div className="border-orange-400 p-2 border-2 m-4 rounded ">
          IBT sucessfully sent to zendesk, check progress{" "}
          <a href={requestStatus?.job_status?.url} className="text-indigo-600">
            here
          </a>
        </div>
      ) : null}
      <div className="w-1/3">
        <p>IBTs that you have entered above will appear below</p>
        <p>
          IBTs in red will not be sent to zendesk, green will be sent to zendesk
        </p>
        <p>
          IBTs that are duplicates will only be sent to zendesk once (if they
          are 7 digits long)
        </p>
        {ibts
          ? ibts.map((ibt, i) => (
              <div
                key={ibt + i}
                className={`${
                  isValidIBT(ibt) && doesNotExistOnZendesk(ibt)
                    ? "border-green-500 border-2 rounded"
                    : "border-red-700 border-2 rounded"
                } p-1 m-2
                  ${isUniqueIBT(ibt) ? "" : "border-orange-300"}`}
              >
                {ibt}
                {doesNotExistOnZendesk(ibt)
                  ? null
                  : " - This problem IBT already exists in Zendesk, it won't be sent"}{" "}
                {isUniqueIBT(ibt) ? null : "- This IBT number is a duplicate"}
              </div>
            ))
          : null}
      </div>
    </form>
  );
}

export default ProblemIbtForm;
