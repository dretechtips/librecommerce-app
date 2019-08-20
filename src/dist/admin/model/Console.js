module.exports = class hconsole
{
  static log(msg)
  {
    console.log(`[${new Date}](INFO): ${msg}`);
  }
  static error(msg)
  {
    console.log(`[${new Date}](ERROR): ${msg}`);
  }
}