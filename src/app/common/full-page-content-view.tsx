import { getContent } from "~/server/queries"

export default async function FullPageContentView(props: { id: number }) {
    const content = await getContent(props.id)

    return (
        <div>
            <div>{content.id}</div>
            <div>{content.name}</div>
            <div>{content.text}</div>
        </div>
    )
}