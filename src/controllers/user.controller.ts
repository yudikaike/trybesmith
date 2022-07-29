import { Request, Response } from 'express';

import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

export default class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    await this.userService.create(user);
    const token = await AuthService.createToken(user);
    res.status(201).json({ token });
  };
}
