"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Note = {
  id: string; // Prisma uses string (cuid) by default
  title: string;
  desc: string;
};

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch("/api/get-notes");
        const data = await res.json();
        console.log("API response:", data);

        if (Array.isArray(data)) {
          setNotes(data);
        } else {
          setNotes([]); // fallback if backend misbehaves
        }
      } catch (err) {
        console.error("Failed to fetch notes:", err);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (notes.length === 0) {
    return <p className="text-gray-500">No notes yet.</p>;
  }

  return (
    <div className="flex gap-8 m-10">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{note.desc}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
