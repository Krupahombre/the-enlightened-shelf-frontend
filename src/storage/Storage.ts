import { createContext, useContext } from "react";
import UserStorage from "./UserStorage";

interface IStore {
  userStorage: UserStorage;
}

export const storage: IStore = {
  userStorage: new UserStorage(),
};

export const StorageContext = createContext(storage);

export function useStorage() {
  return useContext(StorageContext);
}
