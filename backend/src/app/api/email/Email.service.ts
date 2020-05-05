import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import { EmailDOT } from "./Email.interface";
import { Email } from "./Email.model";

@Injectable()
export class EmailService extends Service<typeof Email> {
  private undo = 15000;
  private ready: Map<string, EmailDOT>;
  /**
   * Places an email in the ready map in order to send in the f
   * @param email Email
   */
  public async placement(dot: EmailDOT): Promise<void> {
    const email = await this.add(dot);
    this.handleReady(email);
  }

  public async send(dot: EmailDOT): Promise<void> {
    // Communicate with STMP Servers
  }
  /**
   * This cancels the email that are ready to send
   * @param id Email ID
   */
  public cancel(id: string): boolean {
    return this.ready.delete(id);
  }

  private handleReady(email: Email) {
    this.ready.set(email._id, email);
    setTimeout(async () => {
      await this.send(email);
      this.ready.delete(email._id);
    }, this.undo);
  }
}

export default EmailService;
