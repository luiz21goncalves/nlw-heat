import { prismaClient } from '../prisma';

class GetLastThreeMessagesService {
  async execute() {
    return prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true,
      },
    });
  }
}

export { GetLastThreeMessagesService };
