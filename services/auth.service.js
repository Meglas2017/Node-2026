import bcrypt from "bcrypt";
import { getUser } from "../models/auth.model.js";


export const verifyUser = async (email, password) => {
  const user = await getUser(email);
  if (!user) {
    throw new Error("User not found");
  }
  if (!user.password) {
    throw new Error("User has no password set");
  }
  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  return user;
}


export const verifyPassword = async (inputPassword, storedHash) => {
  return await bcrypt.compare(inputPassword, storedHash);
};