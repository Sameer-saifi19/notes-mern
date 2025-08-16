import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function DialogOpen() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await fetch("/api/create-notes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, desc }),
    });

    if (result.ok) {
      const data = await result.json();
      setSuccess("Note created :" + data.title);
      setTitle("");
      setDesc("");
    } else {
      const err = await result.json();
      setError(err.error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create new Note</DialogTitle>
            <DialogDescription>
              Add details here to create a new note.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input
                id="name-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                name="description"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="text-white" type="submit">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
