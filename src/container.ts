import UserController from "#Controllers/user.controller";
import DatabaseProvider from "#Providers/database.provider";
import UserRepository from "#Repositories/user.repository";
import UserService from "#Services/user.service";
import { envManager } from "./config/env";

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
