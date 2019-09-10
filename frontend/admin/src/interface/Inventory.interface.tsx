import { FormQuestion } from "./Form.interface";

export interface InventoryProps
{

}

export interface InventoryState
{
  route: string,
}

export interface InventoryAddProps
{
  basicQuestion: FormQuestion[],
  advanceQuestion: FormQuestion[],
}

export interface InventoryAddState
{
  questions: "basic" | "advance"
}