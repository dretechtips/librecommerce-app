import { HttpFunction } from "../decorator/HttpMethod";

export const colors = HttpFunction("GET", "System was unable to get the product colors");

export const list = HttpFunction("GET", "The system could not find the inventory categories");

export const add = HttpFunction("POST", "System was unable to add the inventory category.");
