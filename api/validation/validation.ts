import { CustomValidator } from "express-validator";
import { Level } from "../types";

export const isValidPhoneNumber: CustomValidator = (value: string) => {
  return value.match(/^(6|8|9)\d{7}$/)
}

export const isLevel: CustomValidator = (value: string) => {
  const levels = Object.values(Level);
  return levels.includes(value as Level);
}