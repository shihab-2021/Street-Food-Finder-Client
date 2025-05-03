import AdminPremiumPostControl from "@/components/modules/Dashboard/Admin/AdminPremiumPostControl";
import { getPremiumpost } from "@/service/Posts";

export default async function ManagePremiumPosts() {
  const data = await getPremiumpost();
  return (
    <div>
      <AdminPremiumPostControl posts={data.data} />
    </div>
  );
}
