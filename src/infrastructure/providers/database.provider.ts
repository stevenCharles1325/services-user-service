import {
  createDatabaseManager,
  ExtendedPrismaClient,
} from "#Core/config/managers/database.manager";
import { logger } from "#Core/config/managers/log.manager";

export default class DatabaseProvider {
  private client!: ExtendedPrismaClient;
  private readonly logger = logger.child({ context: "DatabaseProvider" });

  constructor(private readonly databaseUrl: string) {}

  public async connect() {
    const prisma = createDatabaseManager(this.databaseUrl);
    this.client = prisma;
    this.client
      .$connect()
      .then(() => {
        this.logger.info("Database connection established");
      })
      .catch((err) => {
        this.logger.error({ err }, "Failed to connect to database");
      });
  }

  public async disconnect() {
    if (this.client) {
      await this.client.$disconnect();
    }
  }

  public getClient(): ExtendedPrismaClient {
    if (!this.client) {
      throw new Error("Database client not initialized. Call connect() first.");
    }
    return this.client;
  }
}
