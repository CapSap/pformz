"use client";

import { FormEvent, useState } from "react";

export default function EmailChecker() {
  const [emails, setEmails] = useState<string[]>();

  async function checkEmails(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("email state", emails);
    const response = await fetch("/api/email-checker", {
      method: "POST",
      body: JSON.stringify(emails),
    });
    console.log(response);
  }

  return (
    <div>
      <form onSubmit={(e) => checkEmails(e)} className="">
        <label className="text-lg" htmlFor="sku">
          Emails:{" "}
        </label>
        <textarea
          className="border border-black m-3 rounded-sm pl-2"
          name="sku"
          onChange={(e) => {
            setEmails(e.target.value.split(/\s+/));
          }}
        />
        <button className="rounded-md bg-indigo-600 mb-6 px-1 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Check emails
        </button>
      </form>
    </div>
  );
}
