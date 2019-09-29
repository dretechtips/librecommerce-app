import { Tree, TREE_STATUS } from "../data/Tree";
import { User } from "../model/User";

export class UserSM {
  private _employees: Tree<User>;
  constructor() {
    const head: User = User.From.id();
    this._employees = new Tree(head);
  }
  public add(user: User, supervisor: User) {
    const status: TREE_STATUS = this._employees.add(user, supervisor, this._employees.tranverseBFS);
    switch (status) {
      case TREE_STATUS.COMPLETED:
        break;
      case TREE_STATUS.PARENT_DOES_NOT_EXIST:
        break;
      case TREE_STATUS.PAST_LIMIT:
        break;
    }
  }
  public remove(user: User, supervisor: User) {
    this._employees.remove(user, supervisor, this._employees.tranverseBFS);
  }
  public addSupervisor(supervisor: User) {
    this._employees.addToHead(supervisor);
  }
}