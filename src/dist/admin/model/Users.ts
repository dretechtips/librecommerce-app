import { default as Database } from "../model/Database";
import hconsole from "../model/Console";

export class Users
{
  static async add(user, pass, type)
  {
      Database.all.main.singleQuery();
  }
  static async remove(user)
  {
    database.main.singleQuery();
  }
  static modify(user, pass, type)
  {
    database.main.singleQuery();
  }
}

