import { prismaClient } from '../prisma';

class ProfileUserService {
  async execute(user_id: string) {
    return prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });
  }
}

export { ProfileUserService };
