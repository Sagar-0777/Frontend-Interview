import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/blogApi";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowRight, Newspaper } from "lucide-react";

export default function BlogList({
    onSelect,
    selectedId,
}: {
    onSelect: (id: string) => void;
    selectedId: string | null;
}) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["blogs"],
        queryFn: getBlogs,
    });

    if (isLoading)
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );

    if (error)
        return (
            <div className="p-4 text-center text-destructive">
                Error loading blogs. Please try again.
            </div>
        );

    return (
        <div className="space-y-4 p-1 animate-fade-up">
            {data?.map((blog, index) => (
                <Card
                    key={blog.id}
                    className={`group cursor-pointer transition-all duration-500 border-none shadow-none bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 !rounded-2xl relative overflow-hidden ${selectedId === blog.id
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:scale-[1.02]"
                        }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => onSelect(blog.id)}
                >
                    <CardContent className="p-5">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {blog.category.map((cat) => (
                                <span
                                    key={cat}
                                    className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-primary/20 text-primary border border-primary/20"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors break-words">
                            {blog.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 break-words opacity-80 group-hover:opacity-100 transition-opacity">
                            {blog.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                            <span>{format(new Date(blog.date), "MMM dd")}</span>
                            <span className="flex items-center gap-1 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                Read More <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </CardContent>
                    {/* Animated glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Card>
            ))}
            {data?.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 opacity-40">
                    <div className="p-3 bg-muted rounded-2xl">
                        <Newspaper className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest">
                        Your library is empty
                    </p>
                </div>
            )}
        </div>
    );
}
