import { prisma } from "@/lib/prisma";

export async function GET(req: Request){
    const allNotes = await prisma.user.findMany({
        where: 
    })
}