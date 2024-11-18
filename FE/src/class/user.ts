import { supabase } from "@/lib/connections/supabase"

class Users {
  id?: number
  username?: string
  password?: string
  full_name?: string
  role?: string
  created_at?: Date | null
  last_login_at?: Date | null
  updated_at?: Date | null

  constructor(init?: Partial<Users>) {
    Object.assign(this, init)
  }

  static async getItems(): Promise<Users[]> {
    const { data, error } = await supabase
      .from('users') 
      .select('*');

    if (error) {
      console.error('Error fetching items:', error)
      return []
    }

    const res = data?.map((item) => ({
      id: item.id,
      username: item.username,
      password: item.password,
      full_name: item.full_name,
      role: item.role,
      created_at: item.created_at ? new Date(item.created_at) : null,
      last_login_at: item.last_login_at ? new Date(item.last_login_at) : null,
      updated_at: item.updated_at ? new Date(item.updated_at) : null,
    }));

    console.log(res)
    return res;
  }
}

export default Users;