const { Pool } = require('pg');
const hconsole = require('./Console');
const crypto = require('crypto');

class Database 
{
  static all = {}
  constructor(name, user, pass)
  {
    this.name = name;
    this.user = user;
    this.pass = pass;
    this.pool = new Pool({
      host: '127.0.0.1',
      user: this.user,
      pass: this.pass,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
    Database.all[name] = this;
  }
  static encrypt(msg)
  {
    const cipher = crypto.createCipheriv('aes-256-ccm', this.key, this.iv);
    let encrypted = cipher.update(msg, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
  setKey(key)
  {
    this.key = key;
    return this;
  }
  setIV(iv)
  {
    this,iv = iv;
    return this;
  }
  static decrypt(eMsg)
  {
    const decipher = crypto.createDecipheriv('aes-256-ccm', this,key, this.iv);
    let decrypted = decipher.update(eMsg, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }
  stop()
  {
    this.pool.end();
    hconsole.log("Pool connection is ending!");
  }
  async singleQuery(query)
  {
    try
    {
      const client = await this.pool.connect();
      const result = await client.query(query);
      client.release();
      return result;
    }
    catch(e)
    {
      console.log("Unable to make the query :: "+ query);
      return false;
    }
  }
  static arrayToSqlArray(array)
  {
    return `ARRAY[${arrap.map(cur => cur.unshift('\'').push('\'')).toString()}]`;
  }
  static objtoSqlSetStr(obj)
  {
    let str = '';
    const keys =  Object.keys(obj);
  }
};

const main = new Database('main', 'postgres');

module.exports = Database;
