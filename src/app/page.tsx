import { db } from "~/server/db";

export const dynamic = "force-dynamic"

async function Contents() {
  const contents = await db.query.contents.findMany()

  return (
    <div className="flex flex-wrap gap-4">
      {contents.map((content) => (
        <div className="flex w-48 flex col" key={content.id}>
          <div key={content.id}>{content.id}</div>
          <div key={content.id}>{content.name}</div>
        </div>
      ))}
    </div>
  )
}


export default async function HomePage() {


  return (
    <main className="">
      <Contents />
    </main>
  );
}
