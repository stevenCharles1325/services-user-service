import { CreateUserDTO, SearchUserDTO } from "#Core/schemas/user.schema";
import UserService from "#App/services/user.service";
import { Request, Response } from "express";

export default class UserController {
  constructor(private readonly userService: UserService) {}

  async getAll(req: Request, res: Response) {
    const { filter, cursor, take, orderBy } = req.body as SearchUserDTO;

    const { users, meta } = await this.userService.findAll({
      where: filter,
      startCursor: cursor.after,
      endCursor: cursor.before,
      limit: take,
      orderBy: { [orderBy?.field ?? "createdAt"]: orderBy?.order ?? "asc" },
    });

    res.json({ success: true, users, meta });
  }

  async create(req: Request, res: Response) {
    const { email, firstName, lastName, middleName, birthDate } =
      req.body as CreateUserDTO;

    const user = await this.userService.createUser({
      firstName,
      email,
      lastName,
      middleName,
      birthDate,
    });

    res.status(201).json({ success: true, user });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { email, firstName, lastName, middleName, birthDate } =
      req.body as CreateUserDTO;
    const updatedUser = await this.userService.updateUser(id as string, {
      email,
      firstName,
      lastName,
      middleName,
      birthDate,
    });

    res.json({ success: true, user: updatedUser });
  }

  async updateAvatar(req: Request, res: Response) {
    const { id } = req.params;
    const { avatarUrl } = req.body as { avatarUrl: string };

    await this.userService.updateAvatar(id as string, { avatarUrl });
    res.json({ success: true, message: "Avatar updated successfully" });
  }

  async deleteMany(req: Request, res: Response) {
    const { ids } = req.body as { ids: string[] };
    const deletedCount = await this.userService.deleteUsers(ids);

    res.json({
      success: true,
      message: `${deletedCount} users deleted successfully`,
    });
  }
}
