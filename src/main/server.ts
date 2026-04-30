import Container from "../main/container";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import createUserRoutes from "src/app/routes/user.route";
import { errorMiddleware } from "#Middleware/error.middleware";

export default async function createServer(container: Container) {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use("/api/users", createUserRoutes(container.userController));

  app.use(errorMiddleware);

  return app;
}
