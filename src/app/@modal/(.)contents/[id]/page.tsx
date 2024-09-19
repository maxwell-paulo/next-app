import { Modal } from "./modal"
import FullPageContentView from "~/app/_components/contentPage/fullPageContentView"


export default function ContentModal() {

    return (
        <Modal>
            <FullPageContentView isModal={true} />
        </Modal>
    )
}