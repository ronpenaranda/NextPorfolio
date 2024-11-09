import create from 'zustand'
import Users from '@/class/user'

interface UserStore {
  users: Users[] | []
  setUsers: (users: Users[]) => void
  fetchUsers: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],  
  setUsers: (users) => set({ users }),
  fetchUsers: async () => {
    const users = await Users.getItems()
    set({ users })  
  },
}))