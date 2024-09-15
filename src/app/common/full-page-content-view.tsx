import { Button } from "~/components/ui/button"
import { deleteContent, getContent } from "~/server/queries"

export default async function FullPageContentView(props: { id: number }) {
    const content = await getContent(props.id)

    return (
        <div>
            <div>{content.id}</div>
            <div>{content.name}</div>
            <div>{content.text}</div>
            <form action={async () => {
                "use server"

                await deleteContent(props.id)
            }}>
                <Button type="submit" variant="destructive">Delete</Button>
            </form>
        </div>
    )
}