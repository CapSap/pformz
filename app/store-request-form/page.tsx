import { getDBData } from "../_utils/serverActions";
import StoreRequstForm from "../components/StoreRequestForm";

import Page from "../_utils/serverActions";

async function StoreRequestPage() {
  const data = await getDBData();
  console.log("db data", data);

  console.log("page", await Page());
  return (
    <div>
      hello world
      <StoreRequstForm />
    </div>
  );
}
export default StoreRequestPage;
