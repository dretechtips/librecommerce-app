import { HttpFunction } from "../decorator/HttpMethod";

export const add = HttpFunction("POST", "The system was unable to add a new product variation.");

export const remove = HttpFunction("DELETE", "The system was unable to delete a product variation.");

export const update = HttpFunction("PATCH", "The system was unable to update a product variation.");