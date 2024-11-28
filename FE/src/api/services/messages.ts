import supabase from "@/db/supabase";

interface Message {
    id: number;
    content: string;
    created_at: string;
  }

class MgsService {
    static async getSMS(): Promise<Message[]> {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
      
        if (error) {
          console.error('Error fetching messages on the server:', error);
        }
      
        return data || [];
      }
}

export default MgsService;