import supabase from "@/db/supabase";

interface Project {
  id: number;
  created_at: any;
  title: string;
  content: string;
  technology: any;
  url: string;
}

class ProjectsService {
  static async getAllProjects(): Promise<Project[]> {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*");

    if (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }

    return projects || [];
  }

  static async getProjectsByName(name: string): Promise<Project[]> {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("title", name);

    if (error) {
      console.error("Error fetching project by name:", error);
      throw error;
    }

    return projects || [];
  }
}

export default ProjectsService;