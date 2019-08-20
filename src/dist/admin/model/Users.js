const Database = require('./Database');
const hconsole = require('./Console');

module.exports = class Users
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