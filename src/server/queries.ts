import "server-only"
import { db } from "./db"
import { contents, projects } from "./db/schema"
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
    await db.delete(contents).where(eq(contents.id, id));

    redirect("/");
}

export async function createProject(name: string) {
    if (!name || name.trim() === "") {
        throw new Error("Project name is required");
    }

    await db.insert(projects).values({
        name,
        createdAt: new Date(),
    });

}