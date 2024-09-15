import "server-only"
import { db } from "./db"
import { contents } from "./db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export async function getContents() {
    const contents = await db.query.contents.findMany()

    return contents
}

export async function getContent(id: number) {
    const content = await db.query.contents.findFirst({
        where: (model, { eq }) => eq(model.id, id)
    })

    if (!content) throw new Error("Content not found")

    return content
}

export async function deleteContent(id: number) {
    // Deleta o conteúdo onde o ID é igual ao passado na função
    await db.delete(contents).where(eq(contents.id, id));

    // Redireciona para a página inicial após a exclusão
    redirect("/");
}