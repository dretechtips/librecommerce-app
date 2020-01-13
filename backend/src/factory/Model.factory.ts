import { PersistantData, DefaultPersistantData } from "../interface/Model.interface";
import uuid from "uuid/v4";

export abstract class Model<T extends PersistantData<T>, C extends T> {
  protected data: Partial<C> & DefaultPersistantData;
  constructor(data: Partial<C>) {
    this.data = { ...data, id: uuid(), timestamp: new Date().toString() };
  }
  private save() {

  }
  private update() {

  }
  private delete() {

  }
}

export default Model;

//type ExtractSchemaPersistantData<T extends Schema<any, any>> = T extends Schema<infer D, any> ? D : never;

//type ExtractSchemaBuisnessData<T extends Schema<any, any>> = T extends Schema<any, infer D> ? D : never;

//type SchemasObject = { [key: string]: Schema<any, any> };

///**
// * Don't extend, use as composition for Model
// * @typedef T Persistant Data
// * @typedef C Business Data
// */
//export class Schema<T extends PersistantData<T> = {}, C = {}> {
//  private input: (data: T) => C;
//  private output: (data: C) => T;
//  constructor(input: (data: T) => C, output: (data: C) => T) {
//    this.input = input;
//    this.output = output;
//  }
//}



///**
// * @typedef S Schemas Object
// * */
//export abstract class Model<S extends SchemasObject> {
//  protected abstract schema: S;
//  protected props: { [C in keyof S]: ExtractSchemaPersistantData<S[C]> };
//  private default: DefaultPersistantData;
//  constructor(props: { [C in keyof S]: ExtractSchemaPersistantData<S[C]> }) {
//    this.props = props;
//    this.default = {
//      id: uuid(),
//      timestamp: new Date().toString(),
//    }
//  }
//  public save(): void {
//    // Add to Database
//  }
//  public update(): void {
//    // Fetch ID and update
//  }
//  public delete(): void {
//    // Lookup ID and delete
//  }
//}

