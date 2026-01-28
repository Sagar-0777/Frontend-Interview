import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../api/blogApi";
import { Card } from "@/components/ui/card";

export default function BlogList({
  onSelect,
}: {
  onSelect: (id: number) => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) return <p>Loading blogs...</p>;
  if (error) return <p>Error loading blogs</p>;

  return (
    <div className="space-y-3">
      {data?.map((blog) => (
        <Card
          key={blog.id}
          className="p-4 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(blog.id)}
        >
          <p className="text-xs text-gray-500">
            {blog.category.join(", ")}
          </p>
          <h2 className="font-bold">{blog.title}</h2>
          <p className="text-sm">{blog.description}</p>
        </Card>
      ))}
    </div>
  );
}
