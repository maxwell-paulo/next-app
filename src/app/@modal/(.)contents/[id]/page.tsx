import { Modal } from "./modal"
import FullPageContentView from "~/app/common/full-page-content-view"


export default function ContentModal({
    params: { id: contentId },
}: {
    params: { id: string }
}) {
    const idAsNumber = Number(contentId)
    if (Number.isNaN(idAsNumber)) throw new Error("Invalid content id")

    return (
        <Modal>
            <FullPageContentView id={idAsNumber} />
        </Modal>
    )
}