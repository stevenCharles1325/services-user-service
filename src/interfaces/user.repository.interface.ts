import type { Prisma, User } from "#Prisma";
import { CursorPaginationMeta } from "prisma-extension-pagination/dist/types";

export type UserPaginationInput = {
  startCursor?: string;
  endCursor?: string;
  limit?: number;
  where?: Prisma.UserWhereInput;
  orderBy?:
    | Prisma.UserOrderByWithAggregationInput
    | Prisma.UserOrderByWithRelationInput
    | Prisma.UserOrderByWithRelationInput[]
    | Prisma.UserOrderByWithAggregationInput[]
    | undefined;
};

export type UserPaginationResult = {
  users: User[];
  meta: CursorPaginationMeta;
};

export default interface IUserRepository {
  findAll(options: UserPaginationInput): Promise<UserPaginationResult>;
  findById(id: string): Promise<User | null>;
  // findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  updateAvatar(userId: string, avatarUrl: string): Promise<User>;
  deleteMany(ids: string[]): Promise<number>;
}
