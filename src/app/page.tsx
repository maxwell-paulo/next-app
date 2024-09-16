
import Link from "next/link";
import { listProjects } from "./services/projectsService";
import { getContents } from "~/server/queries";
import { FilterProjectsInput } from "./_components/filterProjects";

export const dynamic = "force-dynamic"

async function Contents() {


  return (
    <FilterProjectsInput />
  )
}


export default async function HomePage() {


  return (
    <main className="">
      <Contents />
    </main>
  );
}
