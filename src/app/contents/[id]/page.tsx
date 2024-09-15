
export default function ContentModal({
    params: { id: contentId },
}: {
    params: { id: string }
}) {
    return (
        <div>{contentId}</div>
    )
}