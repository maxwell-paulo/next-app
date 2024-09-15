import { db } from "~/server/db";

export const dynamic = "force-dynamic"


export default async function HomePage() {
  const contents = await db.query.contents.findMany()

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {contents.map((content) => (
          <div key={content.id}>{content.name}</div>
        ))}
      </div>
    </main>
  );
}
