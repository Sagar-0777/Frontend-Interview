import { useState } from "react";
import BlogList from "../components/BlogList";
import BlogDetail from "../components/BlogDetail";
import CreateBlog from "../components/CreateBlog";

export default function Home() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-3 h-screen gap-4 p-4">
      {/* Left Panel */}
      <div className="col-span-1 overflow-y-auto space-y-4">
        <CreateBlog />
        <BlogList onSelect={setSelectedId} />
      </div>

      {/* Right Panel */}
      <div className="col-span-2 overflow-y-auto">
        <BlogDetail blogId={selectedId} />
      </div>
    </div>
  );
}
