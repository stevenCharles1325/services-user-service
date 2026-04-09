import Container from "#Container";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorMiddleware } from "#Middlewares/error.middleware";
import createUserRoutes from "#Routes/user.route";

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
