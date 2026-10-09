import ProjectForm from "@/components/admin/projects/ProjectForm";

export const metadata = {
  title: "New Project",
};


export default function NewProjectPage() {
  return (
    <div className="space-y-8 container max-w-4xl mx-auto py-8">
      <div>
        <h1 className="text-3xl font-display font-black tracking-tight text-on-surface">New Project Dossier</h1>
        <p className="text-on-surface-variant mt-2">Create a new comprehensive case study or portfolio piece.</p>
      </div>

      <ProjectForm />
    </div>
  );
}
