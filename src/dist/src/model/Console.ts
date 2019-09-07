export default class hconsole
{
  public static log(msg: string) : void
  {
    console.log(`[${new Date}](INFO): ${msg}`);
  }
  public static error(msg: string | Error) : void
  {
    if(typeof msg === "string")
    {
      console.error(`[${new Date}](ERROR): ${msg}`);
    }
    else console.error(`[${new Date}](ERROR) ${msg.message} \n ${msg.stack}`);
  }
}