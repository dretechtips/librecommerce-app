import Model from './Model.factory';
import Controller from './Controller.factory';
import { PropSafe } from '../interface/Model.interface';

const MVCFactory = function<Constructor, State, Interface extends PropSafe>() {
  class MVCFactory {
    public static Model() {
      return Model<Constructor, State, Interface>();
    }
    public static Controller() {
      return Controller<Constructor, State, Interface>();
    }
    public static View() {}
  }
  return MVCFactory;
};

export default MVCFactory;
