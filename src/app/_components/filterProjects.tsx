import Link from "next/link";
import { listProjects } from "../services/projectsService";

export async function FilterProjectsInput() {
    const projects = await listProjects()



    return (
        <div className="flex flex-wrap gap-4">
            {projects.map((content) => (
                <div className="flex w-48 flex col" key={content.id}>
                    <Link href={`/contents/${content.id}`}>
                        <div key={content.id}>{content.id}</div>
                        <div key={content.id}>{content.name}</div>
                    </Link>
                </div>
            ))
            }
        </div >
    );
}
