import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: 'token.missing',
    });
  }

  const [_, token] = authToken.split(' ');

  if (!token) {
    return response.status(401).json({
      errorCode: 'token.missing',
    });
  }

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    console.log({ authToken, token });

    // eslint-disable-next-line no-param-reassign
    request.user = { id: sub };

    return next();
  } catch (err) {
    console.error(err);
    return response.status(401).json({
      errorCode: 'token.expired',
    });
  }
}

export { ensureAuthenticate };
