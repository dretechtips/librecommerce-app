import { Request, Response, NextFunction, RequestHandler } from "express";
import Customer from "../model/Customer";
import { HttpMethod, HttpFunction } from "../decorator/Http.decorator";
import Controller from "../factory/Controller";

export const controller = new Controller("customer", Customer);

/**
 * Get customer from ID and stores it temporarily
 */
export const GetFromBody = function(): RequestHandler {
  return controller.get();
};

export const GetFromID = function(id: string): RequestHandler {
  return controller.get(id);
};

/**
 * Get customer from ID stored within the cookies and stores it temporarily
 */
export const GetFromCookies = function(): RequestHandler {};

export const Get = function(type: "admin" | "client"): RequestHandler {
  if (type === "admin") return GetFromBody();
  return GetFromCookies();
};

export const Search = function(): RequestHandler {};

export const Verify = function(): RequestHandler {};

export const SignIn = function(): RequestHandler {};

export const Read = function(): RequestHandler {};

export const Update = function(): RequestHandler {};

export const Delete = function(): RequestHandler {};

export const Email = function(): RequestHandler {};

/**
 *  A request has been sent to change your password. Here a link to change your password
 *   https://rufftiger.com/client/resetpassword
 *   Note: The link will expire in 24 hours.
 */
export const ResetPassword = function(): RequestHandler {};
