import fs = require('fs');

export class ConsolePlus
{
  constructor()
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
              this.log("Output Directory has been initalized");
            })
          }
        })
      });
    } catch (e) {
      const ex: Error = e;
      this.error(ex);
    }
  }
  public log(msg: string) : void
  {
    try {
      const msgf: string =  `[${new Date}](INFO): ${msg}`;
      console.log("\x1b[1m", msgf);
      fs.appendFile("./out/log.out.txt", msgf, (error) =>
      {
        if(error) throw error;
      })
    } catch (e) {
      const ex: Error = e;
      this.error(ex);
    }
  }
  public error(msg: string | Error) : void
  {
    try {
      if(typeof msg === "string")
      {
        const msgf: string = `[${new Date}](ERROR): ${msg}`;
        console.error("\x1b[31m", msgf);
        fs.appendFile("./out/error.out.txt", msgf, (error) => 
        {
          if(error) throw error;
        })
      }
      else 
      {
        const msgf: string = `[${new Date}](ERROR) ${msg.message} \n ${msg.stack}`
        console.error("\x1b[31m", msgf);
        fs.appendFile("./out/error.out.txt", msgf, (error) => 
        {
          if(error) throw error;
        })
      }
    } catch (e) {
      const ex: Error = e;
    }
  }
  public warn(msg: string): void
  {
    try {
      const msgf: string = `[${new Date}](WARNING): ${msg}`;
      console.warn("\x1b[33m", msgf);
      fs.appendFile("./out/log.out.txt", msgf, (error) =>
      {
        if(error) throw error;
      });
    } catch (e) {
      const ex: Error = e;
    }
  }
}
