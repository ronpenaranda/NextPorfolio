import supabase from "@/db/supabase";

export const getProjects = async () => {
    
    let { data: projects, error } = await supabase
    .from('projects')
    .select("*")

    if(error){
        console.error(error)
    }
        
    return projects;
}