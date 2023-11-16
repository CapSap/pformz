import { getData, submitIbts } from "../_utils/serverActions";
import ProblemIbtForm from "../components/ProblemIbtForm";

async function OnlineRefundForm() {
  const existingTickets: { ticket_id: number; problem_ibt: string }[] =
    await getData();

  return (
    <div>
      <div className="landing-background opacity-25" />
      <div className="pt-6 ml-6">
        <h2 className="text-lg">Instructions:</h2>
        <p className="w-1/3 ">
          This form will create a ticket for each IBT problem IBT. The ticket
          will capture the IBT number and your name only (no order numbers). It
          will also check if the ticket already exists (only if the correct
          field has been filled in zendesk)
        </p>
      </div>
      <ProblemIbtForm existingTickets={existingTickets} />
    </div>
  );
}

export default OnlineRefundForm;
