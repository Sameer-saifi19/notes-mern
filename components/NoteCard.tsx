'use client'

import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EllipsisVertical, FolderOpenDot, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";



const NoteCard = () => {
  return (
    <>
      <Card className="w-64 outline-1">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">Hello</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CardAction>
                  <EllipsisVertical/>
              </CardAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
              <DropdownMenuItem> <FolderOpenDot/> Open</DropdownMenuItem>
              <DropdownMenuItem> <Pencil/> Edit</DropdownMenuItem>
              <DropdownMenuItem variant="destructive"> <Trash/> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <CardDescription>Hello how are you</CardDescription>
        </CardContent>
        <Separator/>
        <CardFooter>
          <CardDescription className="flex justify-between flex-1/2">
            <div>
              Created at: 
            </div>
            <div>
              6/7/2024
            </div>
          </CardDescription>
        </CardFooter>
      </Card>
    </>
  );
};

export default NoteCard;
