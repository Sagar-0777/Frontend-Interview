import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/blogApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function CreateBlog() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setTitle("");
      setContent("");
    },
  });

  return (
    <div className="space-y-2">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button
        onClick={() =>
          mutation.mutate({
            title,
            content,
            description: content.slice(0, 50),
            category: ["TECH"],
            coverImage: "https://picsum.photos/600",
            date: new Date().toISOString(),
          })
        }
      >
        Create Blog
      </Button>
    </div>
  );
}
