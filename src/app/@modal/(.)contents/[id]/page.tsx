import { getContent } from "~/server/queries"


export default async function ContentModal({
    params: { id: contentId },
}: {
    params: { id: string }
}) {
    const idAsNumber = Number(contentId)
    if (Number.isNaN(idAsNumber)) throw new Error("Invalid content id")

    const content = await getContent(idAsNumber)

    return (
        <div>
            <div>{content.id}</div>
            <div>{content.name}</div>
            <div>{content.text}</div>
        </div>
    )
}