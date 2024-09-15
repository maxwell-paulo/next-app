import "server-only"
import { db } from "./db"

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