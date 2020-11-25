
import { DAL } from "../DAL/dal";
import { Authenticate } from "../Helpers/authHelper";
import { User } from "../models";


export class UserBL {


  private dal = DAL.getDAL();

  getUser(userId: string) {
    return this.dal.findUser({ _id: userId }).select('-password');
  }
  async createUser(user: User) {
    const loggedUser = await this.dal.createUser(user);
    const token = Authenticate.createToken(loggedUser);
    return { loggedUser, token };
  }
  async login(user: User): Promise<{ token: string; loggedUser: User; }> {
    const loggedUser = await this.dal.findUser(user);
    const token = Authenticate.createToken(loggedUser);
    return { loggedUser, token };
  }


}

