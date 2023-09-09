import { User } from "../models/user";
import fetchData from "./notes_api";

export async function getLoggedinUser(): Promise<User> {
  const response = await fetchData("http://localhost:3000/api/users/", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function SignUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("http://localhost:3000/api/users/signup", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function Login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("http://localhost:3000/api/users/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData("http://localhost:3000/api/users/logout", {
    credentials: "include",
    method: "POST",
  });
}
