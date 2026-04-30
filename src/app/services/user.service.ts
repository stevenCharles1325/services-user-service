import { logger } from "#Core/config/managers/log.manager";
import {
  CreateUserDTO,
  UpdateAvatarDTO,
  UpdateUserDTO,
} from "#Core/schemas/user.schema";
import { User } from "#Prisma";
import type UserRepository from "#App/repositories/user.repository";
import {
  UserPaginationInput,
  UserPaginationResult,
} from "#Core/interfaces/user.repository.interface";

export default class UserService {
  private readonly logger = logger.child({ context: "UserService" });

  constructor(private readonly userRepository: UserRepository) {}

  public async findAll(
    query: UserPaginationInput,
  ): Promise<UserPaginationResult> {
    return this.userRepository.findAll(query);
  }

  public async createUser(user: CreateUserDTO): Promise<User> {
    this.logger.info({ user }, "Create user attempt");

    const createdUser = await this.userRepository.create(user);

    this.logger.info({ userId: createdUser.id }, "User created successfully");
    return createdUser;
  }

  public async updateUser(id: string, user: UpdateUserDTO): Promise<User> {
    this.logger.info({ id, user }, "Update user attempt");

    const updatedUser = await this.userRepository.update(id, user);

    this.logger.info({ id }, "User updated successfully");
    return updatedUser;
  }

  public async updateAvatar(id: string, data: UpdateAvatarDTO): Promise<void> {
    this.logger.info({ id, data }, "Update avatar attempt");

    await this.userRepository.update(id, { avatarUrl: data.avatarUrl });

    this.logger.info({ id }, "Avatar updated successfully");
  }

  public async deleteUsers(ids: string[]): Promise<number> {
    this.logger.info({ ids }, "Delete users attempt");

    const deletedCount = await this.userRepository.deleteMany(ids);

    this.logger.info({ ids, deletedCount }, "Users deleted successfully");
    return deletedCount;
  }
}
