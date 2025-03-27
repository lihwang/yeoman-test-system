import { atomWithStorage } from "jotai/utils";

interface User {
  userName?: string;
  roleCodes?: string;
  token?: string;
}

const userAtom = atomWithStorage<User>("user", {});

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export { userAtom, logout };
