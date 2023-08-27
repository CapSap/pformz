const OnlineRefundForm = () => {
  const submitIbts = async (data: FormData) => {
    "use server";
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
          body: `There is an issue with this IBT ${ibt}. issue was found by ${author}`,
        },
        subject: `IBT with a problem: IBT no ${ibt}`,
        tags: ["of_todo", "problem_ibt"],
      };
    });

    console.log(ticketPayload);
  };

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
