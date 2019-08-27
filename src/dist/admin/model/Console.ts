export default class hconsole
{
  public static log(msg: string) : void
  {
    console.log(`[${new Date}](INFO): ${msg}`);
  }
  public static error(msg: string) : void
  {
    console.log(`[${new Date}](ERROR): ${msg}`);
  }
}