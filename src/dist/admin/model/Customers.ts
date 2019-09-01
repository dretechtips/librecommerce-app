import { default as Database } from '../model/Database';
import Customer from '../interface/Customer.interface';
import { QueryResult, FieldDef } from 'pg';

export class Customers
{
  public static async SearchID(CustomerID: string): Promise<FieldDef[] | false>
  {
    try
    {
      const query: string = `SELECT * FROM customers WHERE id = '${CustomerID}'`;
      const result: QueryResult =  await Database._db.main.singleQuery(query);
      return result.fields;
    }
    catch(e)
    {
      return false;
    }
  }
  public static async SearchName(customerName: string): Promise<FieldDef[] | false>
  {
    try
    {
      const query = `SELECT * FROM customers WHERE name LIKE '%${customerName}%`;
      const result =  await Database._db.main.singleQuery(query);
      return result.fields;
    }
    catch(e)
    {
      return false;
    }
  }
  public static async SearchUsername(cUsername: string): Promise<any[]>
  {
    
  }
  public static async Add(customer: Customer): Promise<boolean>
  {
    try {
      
    } catch (e) {
      
    }
  }
  public static async Remove(customerID: string): Promise<boolean>
  {
    try {
      const query: string = `DELETE FROM customers WHERE id = '${customerID}'`;
      const result: QueryResult = await Database._db.main.singleQuery(query);
      if(result.rows.length > 0)
      {
        return true;
      }
      else return false;
    } catch (e) {
      return false;
    }
  }
}



export default Customer;