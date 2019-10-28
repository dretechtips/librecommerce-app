import { Request, Response, RequestHandler } from "express";
import { HttpMethod, HttpFunction } from "../decorator/HttpMethod";

export const add = HttpFunction("GET", "System was unable to create a new alert.", (req, res) => {
  
});

export const remove = HttpFunction("DELETE", "System was unable to create a new alert.", (req, res) => {

}); 

export const list = HttpFunction("GET", "System was unable to list this users alerts.", (req, res) => {

});