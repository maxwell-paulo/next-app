import "server-only"
import { db } from "./db"

export async function getContents() {
    const contents = await db.query.contents.findMany()

    return contents
}