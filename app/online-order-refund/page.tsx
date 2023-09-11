import { getData, submitIbts } from "../_utils/serverActions";
import ProblemIbtForm from "../components/ProblemIbtForm";

async function OnlineRefundForm() {
  const existingTickets: { ticket_id: number; problem_ibt: string }[] =
    await getData();

  return (
    <div>
      <ProblemIbtForm existingTickets={existingTickets} />
    </div>
  );
}

export default OnlineRefundForm;
