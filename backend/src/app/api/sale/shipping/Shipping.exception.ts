export class AlreadyShippedException extends Error {
  constructor() {
    super();
    this.name = "AlreadyShippeedException";
    this.message = "Packages has been already been shipped";
  }
}