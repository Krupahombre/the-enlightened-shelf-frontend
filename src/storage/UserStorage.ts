import { makeAutoObservable, reaction, runInAction } from "mobx";
import Constants from "../utils/Constants";
import AuthResponse from "../interfaces/auth/AuthResponse";

export default class UserStorage {
  role: string | null = localStorage.getItem(Constants.CookieKeys.Role);
  userName: string | null = localStorage.getItem(Constants.CookieKeys.UserName);
  token: string | null = localStorage.getItem(Constants.CookieKeys.Token);

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.role,
      (role) => {
        if (role) {
          localStorage.setItem(Constants.CookieKeys.Role, role);
        } else {
          localStorage.removeItem(Constants.CookieKeys.Role);
        }
      }
    );

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem(Constants.CookieKeys.Token, token);
        } else {
          localStorage.removeItem(Constants.CookieKeys.Token);
        }
      }
    );

    reaction(
      () => this.userName,
      (userName) => {
        if (userName) {
          localStorage.setItem(Constants.CookieKeys.UserName, userName);
        } else {
          localStorage.removeItem(Constants.CookieKeys.UserName);
        }
      }
    );
  }

  isAdmin = () => {
    return this.role === Constants.Roles.Admin;
  };

  isLoggedIn = () => {
    return !!this.token;
  };

  getUserName = () => {
    return this.userName;
  };

  setUser = (value: AuthResponse) => {
    runInAction(() => {
      this.role = value.role;
      this.token = value.token;
      this.userName = value.username;
    });
  };

  logoutUser = () => {
    runInAction(() => {
      this.role = null;
      this.token = null;
      this.userName = null;
    });
  };
}
