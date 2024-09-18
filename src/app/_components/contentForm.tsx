import { type FullContent } from "../common/types/contentTypes";

export function ContentForm({ content, setContent }: { content: FullContent; setContent: React.Dispatch<React.SetStateAction<FullContent | null>> }) {
    function handleContentChange(key: "name" | "text", newValue: string) {
        if (content) {
            const updatedContent = {
                ...content,
                content: {
                    ...content.content,
                    [key]: newValue,
                },
                dynamicFields: content.dynamicFields || [],
            };
            setContent(updatedContent);
        }
    }

    return (
        <>
            <div className="mb-6">
                <label htmlFor="name" className="block text-lg font-semibold mb-1">Name</label>
                <input
                    id="name"
                    type="text"
                    value={content.content.name}
                    onChange={(e) => handleContentChange('name', e.target.value)}
                    className="border-2 border-gray-300 rounded-md p-2 text-black w-full"
                    placeholder="Content Name"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="text" className="block text-lg font-semibold mb-1">Informations</label>
                <textarea
                    id="text"
                    value={content.content.text}
                    onChange={(e) => handleContentChange('text', e.target.value)}
                    className="border-2 border-gray-300 rounded-md p-2 text-black w-full"
                    placeholder="Content Text"
                />
            </div>
        </>
    );
}
