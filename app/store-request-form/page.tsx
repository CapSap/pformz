import { getDatabaseData } from "../_utils/serverActions";
import StoreRequstForm from "../components/StoreRequestForm";

async function StoreRequestPage() {
  const data = await getDatabaseData();

  return <StoreRequstForm />;
}
export default StoreRequestPage;
