import supabase from "@/db/supabase";

interface Menus {
  id: number;
  created_at: string;
  title: string;
  url: string;
  icon: string;
  role: string;
  about: any;
  experience: any;
  personal: any;
}

class MenuService {
  static async getAllMenu(): Promise<Menus[]> {
    const { data: projects, error } = await supabase
      .from("menu")
      .select("*");

    if (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }

    return projects || [];
  }

  static async getMenuByRole(role: string): Promise<Menus[]> {
    const { data: projects, error } = await supabase
      .from("menu")
      .select("*")
      .eq("role", role);

    if (error) {
      console.error("Error fetching project by id:", error);
      throw error;
    }

    return projects || [];
  }

  static async getPersonalInfo() {
    const { data: portfolio, error } = await supabase
      .from("portfolio")
      .select("*");

    if (error) {
      console.error("Error fetching", error);
      throw error;
    }

    return portfolio || [];
  }
}

export default MenuService;