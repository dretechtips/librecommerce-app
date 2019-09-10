import fs = require('fs');

class hconsole
{
  private static _console: Console = new Console();
  public static init(): hconsole
  {
    try {
      fs.exists("./out", (exists) =>
      {
        if(!exists) fs.mkdir("./out", (error) =>
        {
          if(error) throw error;
          const fileNames: string[] = ["error.out.txt", "log.out.txt"];
          for(let file of fileNames)
          {
            fs.writeFile(file, "", (error) =>
            {
              if(error) throw error;
              hconsole.log("Output Directory has been initalized");
            })
          }
        })
      });
      return hconsole;
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public static log(msg: string) : void
  {
    try {
      const msgf: string =  `[${new Date}](INFO): ${msg}`;
      this._console.log("\x1b[1m", msgf);
      fs.appendFile("./out/log.out.txt", msgf, (error) =>
      {
        if(error) throw error;
      })
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public static error(msg: string | Error) : void
  {
    try {
      if(typeof msg === "string")
      {
        const msgf: string = `[${new Date}](ERROR): ${msg}`;
        this._console.error("\x1b[31m", msgf);
        fs.appendFile("./out/error.out.txt", msgf, (error) => 
        {
          if(error) throw error;
        })
      }
      else 
      {
        const msgf: string = `[${new Date}](ERROR) ${msg.message} \n ${msg.stack}`
        this._console.error("\x1b[31m", msgf);
        fs.appendFile("./out/error.out.txt", msgf, (error) => 
        {
          if(error) throw error;
        })
      }
    } catch (e) {
      const ex: Error = e;
    }
  }
  public static warn(msg: string): void
  {
    try {
      const msgf: string = `[${new Date}](WARNING): ${msg}`;
      this._console.warn("\x1b[33m", msgf);
      fs.appendFile("./out/log.out.txt", msgf, (error) =>
      {
        if(error) throw error;
      });
    } catch (e) {
      const ex: Error = e;
    }
  }
}

hconsole.init();

export default hconsole;