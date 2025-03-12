import { atom } from 'jotai'


interface User {
  id?: number;
  userName?: string;
  realName?: string;
  roleCode?: string;
  token?: string;
};

const userAtom = atom<User>({})


// const user

const logout=()=>{
  localStorage.removeItem('token')
}


export {
    userAtom,
    logout
}