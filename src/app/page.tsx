import Link from "next/link";
import { getContents } from "~/server/queries";

export const dynamic = "force-dynamic"

async function Contents() {
  const contents = await getContents()

  return (
    <div className="flex flex-wrap gap-4">
      {contents.map((content) => (
        <div className="flex w-48 flex col" key={content.id}>
          <Link href={`/contents/${content.id}`}>
            <div key={content.id}>{content.id}</div>
            <div key={content.id}>{content.name}</div>
          </Link>
        </div>
      ))
      }
    </div >
  )
}


export default async function HomePage() {


  return (
    <main className="">
      <Contents />
    </main>
  );
}
