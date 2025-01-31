import { SetupUser } from "@/server/billing/actions/setupUser";

export default async function SetupPage() {
  return await SetupUser();
}
 