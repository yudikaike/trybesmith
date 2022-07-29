import jwt from 'jsonwebtoken';

import User from '../interfaces/user.interface';

const AuthService = {
  async createToken(user: User) {
    const { password, ...restOfUser } = user;
    const token = jwt.sign({ data: restOfUser }, 'SECRET', { 
      expiresIn: '15m',
      algorithm: 'HS256',
    });
    
    return token;
  },
};

export default AuthService;
