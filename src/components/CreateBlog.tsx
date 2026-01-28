import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/api/blogApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { useState } from "react";
import { PlusCircle, Loader2 } from "lucide-react";

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;

        mutation.mutate({
            title,
            content,
            description: content.slice(0, 100),
            category: ["TECH"],
            coverImage: `https://picsum.photos/seed/${Math.random()}/800/450`,
            date: new Date().toISOString(),
        });
    };

    return (
        <Card className="border-none shadow-none bg-white/5 dark:bg-white/5 !rounded-2xl overflow-hidden backdrop-blur-sm ring-1 ring-white/10">
            <CardHeader className="pb-4">
                <CardTitle className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-primary">
                    <PlusCircle className="w-4 h-4" />
                    Compose Post
                </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-3">
                    <Input
                        placeholder="Story Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={mutation.isPending}
                        className="bg-black/20 border-none focus-visible:ring-primary/50 placeholder:text-muted-foreground/40 text-sm font-bold h-11"
                    />
                    <Textarea
                        placeholder="Tell your story..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={mutation.isPending}
                        className="min-h-[100px] bg-black/20 border-none focus-visible:ring-primary/50 placeholder:text-muted-foreground/40 text-sm resize-none"
                    />
                </CardContent>
                <CardFooter className="pt-2">
                    <Button
                        type="submit"
                        className="w-full font-black uppercase tracking-widest text-[10px] h-11 rounded-xl shadow-lg shadow-primary/20"
                        disabled={mutation.isPending || !title || !content}
                    >
                        {mutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            "Publish Now"
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
