import { getProjects } from "@/actions/dossier";
import ProjectsTableClient from "@/components/admin/projects/ProjectsTableClient";
import { getAuthUser } from "@/actions/auth";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Manage Projects",
};


export default async function ProjectsPage() {
  const user = await getAuthUser();
  if (!user || user.role === 'MEMBER') notFound();

  const result = await getProjects();
  const projects = result.success ? result.projects : [];

  return <ProjectsTableClient initialProjects={projects} />;
}
