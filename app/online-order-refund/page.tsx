import { FormEvent, useState } from "react";

import { getData, submitIbts } from "../_utils/serverActions";

const OnlineRefundForm = async () => {
  const data = await getData();

  console.log("page log", data);

  return (
    <div>
      <form action={submitIbts} className="flex flex-col justify-center m-12">
        <label htmlFor="ibt">IBT: </label>
        <textarea className="border border-black" name="ibt"></textarea>

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
      </form>
    </div>
  );
};

export default OnlineRefundForm;
