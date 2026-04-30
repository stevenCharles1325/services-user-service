import UserController from "#App/controllers/user.controller";
import { validate } from "#Middleware/validation.middleware";
import {
  CreateUserSchema,
  DeleteManySchema,
  SearchUserSchema,
  UpdateAvatarSchema,
  UpdateUserSchema,
} from "#Core/schemas/user.schema";
import express from "express";

export default function createUserRoutes(userController: UserController) {
  const router = express.Router();

  router.post(
    "/search",
    validate(SearchUserSchema),
    userController.getAll.bind(userController),
  );
  router.post(
    "/",
    validate(CreateUserSchema),
    userController.create.bind(userController),
  );
  router.put(
    "/:id",
    validate(UpdateUserSchema),
    userController.update.bind(userController),
  );
  router.put(
    "/avatar/:id",
    validate(UpdateAvatarSchema),
    userController.updateAvatar.bind(userController),
  );
  router.delete(
    "/",
    validate(DeleteManySchema),
    userController.deleteMany.bind(userController),
  );

  return router;
}
