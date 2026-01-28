import { useState } from "react";
import BlogList from "../components/BlogList";
import BlogDetail from "../components/BlogDetail";
import CreateBlog from "../components/CreateBlog";
import { Newspaper, Sparkles } from "lucide-react";

export default function Home() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="flex h-screen mesh-gradient overflow-hidden font-sans selection:bg-primary/30">
            <div className="flex flex-1 overflow-hidden relative z-10">
                {/* Left Sidebar (Create + List) */}
                <aside className="w-full lg:w-[400px] flex flex-col p-6 shrink-0 h-full">
                    <div className="glass rounded-3xl flex flex-col h-full overflow-hidden shadow-2xl">
                        <div className="p-6 space-y-8 flex-1 overflow-y-auto no-scrollbar">
                            <div className="flex items-center gap-3 px-2">
                                <div className="bg-primary/10 p-2 rounded-xl">
                                    <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                                </div>
                                <h1 className="text-xl font-black tracking-tight text-gradient">
                                    INSIGHTS
                                </h1>
                            </div>

                            <CreateBlog />

                            <div className="space-y-4">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2 px-2">
                                    <Newspaper className="w-3 h-3" />
                                    Recent Stories
                                </h2>
                                <BlogList onSelect={setSelectedId} selectedId={selectedId} />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content (Detail) */}
                <main className="flex-1 flex flex-col relative overflow-y-auto no-scrollbar p-6 lg:pl-0">
                    <div className="glass rounded-3xl min-h-full flex flex-col shadow-2xl overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-4 lg:p-8 no-scrollbar">
                            <BlogDetail blogId={selectedId} />
                        </div>
                    </div>
                </main>
            </div>

            {/* Background Orbs for extra depth */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-float"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/20 blur-[100px] rounded-full animate-float" style={{ animationDelay: "-3s" }}></div>
        </div>
    );
}
