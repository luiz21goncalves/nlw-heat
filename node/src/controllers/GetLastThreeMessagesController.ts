import { Request, Response } from 'express';

import { GetLastThreeMessagesService } from '../services/GetLastThreeMessagesService';

class GetLastThreeMessagesController {
  async handle(request: Request, response: Response) {
    const getLastThreeMessagesService = new GetLastThreeMessagesService();

    const messages = await getLastThreeMessagesService.execute();

    return response.json(messages);
  }
}

export { GetLastThreeMessagesController };
