import { getZendeskData, submitIbts } from "../_utils/serverActions";
import ProblemIbtForm from "../components/ProblemIbtForm";

async function OnlineRefundForm() {
  const existingTickets: { ticket_id: number; problem_ibt: string }[] =
    await getZendeskData();

  return (
    <div>
      <div className="landing-background opacity-25" />
      <div className="pt-6 ml-6">
        <h2 className="text-2xl font-bold">Instructions:</h2>
        <p className="w-2/5 text-2xl">
          This form will create a ticket for each IBT problem IBT. The ticket
          will capture the IBT number and your name only (no order numbers or
          other notes). It will also check for duplicates and if the ticket
          already exists (only if the correct field has been filled in zendesk)
        </p>
      </div>
      <ProblemIbtForm existingTickets={existingTickets} />
    </div>
  );
}

export default OnlineRefundForm;
