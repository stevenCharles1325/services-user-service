import IUserRepository, {
  UserPaginationInput,
  UserPaginationResult,
} from "#Interfaces/user.repository.interface";
import { ExtendedPrismaClient } from "#Managers/database.manager";
import { Prisma, User } from "#Prisma";
import { CursorPaginationMeta } from "prisma-extension-pagination";

export default class UserRepository implements IUserRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

  public async findAll(
    options: UserPaginationInput,
  ): Promise<UserPaginationResult> {
    const { startCursor, endCursor, limit, where, orderBy } = options;

    const [users, meta] = await this.prisma.user
      .paginate({
        where,
        orderBy,
      })
      .withCursor({
        before: startCursor,
        after: endCursor,
        limit,
      });

    return { users, meta };
  }

  public async findById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { id } });
  }

  // public async findByEmail(email: string): Promise<User | null> {
  //   return this.prisma.user.findFirst({ where: { email } });
  // }

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  public async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  public async updateAvatar(userId: string, avatarUrl: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });
  }

  public async deleteMany(ids: string[]): Promise<number> {
    const { count } = await this.prisma.user.deleteMany({
      where: { id: { in: ids } },
    });

    return count;
  }
}
