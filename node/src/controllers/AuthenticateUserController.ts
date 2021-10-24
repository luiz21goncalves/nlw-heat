import { Request, Response } from 'express';

import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { code } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    try {
      const { token, user } = await authenticateUserService.execute(code);

      return response.json({ token, user });
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}

export { AuthenticateUserController };
