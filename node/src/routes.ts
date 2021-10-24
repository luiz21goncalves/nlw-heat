import { Router } from 'express';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { GetLastThreeMessagesController } from './controllers/GetLastThreeMessagesController';
import { ProfileUserController } from './controllers/ProfileUserController';
import { ensureAuthenticate } from './middleware/ensureAuthenticate';

const routes = Router();

const authenticateUserController = new AuthenticateUserController();
const createMessageController = new CreateMessageController();
const getLastTreeMessagesController = new GetLastThreeMessagesController();
const profileUserController = new ProfileUserController();

routes.get('/github', (request, response) =>
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
  ),
);

routes.get('/signin/callback', (request, response) => {
  const { code } = request.query;

  return response.json({ code });
});

routes.post('/authenticate', authenticateUserController.handle);

routes.post('/messages', ensureAuthenticate, createMessageController.handle);
routes.get('/messages/last', getLastTreeMessagesController.handle);

routes.get('/profile', ensureAuthenticate, profileUserController.handle);

export { routes };
