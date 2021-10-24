import { Request, Response } from 'express';

import { ProfileUserService } from '../services/ProfileUserService';

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const profileUserService = new ProfileUserService();

    const user = await profileUserService.execute(request.user.id);

    return response.json(user);
  }
}

export { ProfileUserController };
