import AdminRejectedPostControl from "@/components/modules/Dashboard/Admin/AdminRejectPostConterol";
import { getRejectedpost } from "@/service/Posts";

export default async function ManagePosts() {
  const data = await getRejectedpost();
  return (
    <div>
      <AdminRejectedPostControl posts={data.data} />
    </div>
  );
}
