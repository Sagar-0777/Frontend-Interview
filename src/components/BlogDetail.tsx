import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "@/api/blogApi";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function BlogDetail({ blogId }: { blogId: string | null }) {
    const { data, isLoading } = useQuery({
        queryKey: ["blog", blogId],
        queryFn: () => getBlogById(blogId!),
        enabled: !!blogId,
    });

    if (!blogId)
        return (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 bg-muted/20 rounded-lg border-2 border-dashed">
                <div className="w-16 h-16 mb-4 opacity-20">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        ></path>
                    </svg>
                </div>
                <p className="text-lg font-medium">Select a blog to read</p>
                <p className="text-sm">Choose an article from the list to view its contents</p>
            </div>
        );

    if (isLoading)
        return (
            <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );

    return (
        <div className="bg-transparent min-h-full">
            <div className="max-w-3xl mx-auto py-8">
                <div className="relative aspect-[21/9] w-full mb-12 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20">
                    <img
                        src={data?.coverImage}
                        alt={data?.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-8 flex flex-wrap gap-2">
                        {data?.category.map((cat) => (
                            <Badge key={cat} variant="secondary" className="bg-white/20 backdrop-blur-md border-none text-white hover:bg-white/30">
                                {cat}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="space-y-8 animate-fade-up">
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.1] break-words">
                        {data?.title}
                    </h1>

                    <div className="flex items-center justify-between py-6 border-y border-border/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
                                A
                            </div>
                            <div>
                                <p className="font-bold text-foreground">Editorial Team</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                    Published {data ? format(new Date(data.date), "MMMM dd") : ""}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {/* Placeholder for sharing or actions */}
                        </div>
                    </div>

                    <div className="prose prose-stone dark:prose-invert max-w-none">
                        <p className="text-xl lg:text-2xl leading-relaxed text-foreground/80 font-medium italic mb-8 border-l-4 border-primary/30 pl-6 py-2">
                            {data?.content.slice(0, 150)}...
                        </p>
                        <p className="text-lg lg:text-xl leading-loose text-foreground/90 whitespace-pre-wrap pb-20 break-words">
                            {data?.content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
