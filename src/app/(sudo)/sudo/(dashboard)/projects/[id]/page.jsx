import ProjectForm from "@/components/admin/projects/ProjectForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Project",
};


export default async function EditProjectPage({ params }) {
  const { id } = params;
  
  const project = await prisma.dossier.findUnique({
    where: { id }
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8 container max-w-4xl mx-auto py-8">
      <div>
        <h1 className="text-3xl font-display font-black tracking-tight text-on-surface">Edit Dossier</h1>
        <p className="text-on-surface-variant mt-2">Update information for {project.title}.</p>
      </div>

      <ProjectForm project={project} />
    </div>
  );
}
