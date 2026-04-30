import UserController from "src/app/controllers/user.controller";
import DatabaseProvider from "#Infrastructure/providers/database.provider";
import UserRepository from "#App/repositories/user.repository";
import UserService from "#App/services/user.service";
import { envManager } from "#Core/config/env/index";

export default class Container {
  private static instance: Container;

  public userController!: UserController;

  private constructor() {}

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public async init() {
    const env = await envManager.load();

    // Initialize Database provider
    const databaseProvider = new DatabaseProvider(env.DATABASE_URL);
    await databaseProvider.connect();
    const dbClient = databaseProvider.getClient();

    // Initialize repositories
    const userRepository = new UserRepository(dbClient);

    // Initialize services
    const userService = new UserService(userRepository);

    this.userController = new UserController(userService);
  }
}
