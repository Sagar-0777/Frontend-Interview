import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../api/blogApi";

export default function BlogDetail({ blogId }: { blogId: number | null }) {
  const { data, isLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId!),
    enabled: !!blogId,
  });

  if (!blogId) return <p>Select a blog to view details</p>;
  if (isLoading) return <p>Loading blog...</p>;

  return (
    <div className="p-4">
      <img
        src={data?.coverImage}
        className="w-full h-60 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{data?.title}</h1>
      <p className="mt-4">{data?.content}</p>
    </div>
  );
}
