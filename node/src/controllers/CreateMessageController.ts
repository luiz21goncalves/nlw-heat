import { Request, Response } from 'express';

import { CreateMessageService } from '../services/CreateMessageService';

class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { message: text } = request.body;

    const createMessageService = new CreateMessageService();

    const message = await createMessageService.execute(text, request.user.id);

    return response.status(201).json(message);
  }
}

export { CreateMessageController };
