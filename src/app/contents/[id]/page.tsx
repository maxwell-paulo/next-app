import FullPageContentView from "~/app/common/full-page-content-view"


export default function ContentPage({
    params: { id: contentId },
}: {
    params: { id: string }
}) {
    const idAsNumber = Number(contentId)
    if (Number.isNaN(idAsNumber)) throw new Error("Invalid content id")

    return (
        <FullPageContentView id={idAsNumber} />
    )
}