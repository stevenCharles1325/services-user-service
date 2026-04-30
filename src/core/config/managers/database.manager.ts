import { PrismaClient } from "#Prisma";
import { pagination } from "prisma-extension-pagination";
export const createDatabaseManager = (url: string) => {
  const prisma = new PrismaClient({
    datasources: { db: { url } },
  }).$extends(
    pagination({
      cursor: {
        limit: 50,

        getCursor: (item) => `${item.id}:${item.createdAt.getTime()}`,

        parseCursor: (cursor: string) => {
          const [id, timestamp] = cursor.split(":");
          return { id, createdAt: new Date(parseInt(timestamp)) };
        },
      },
    }),
  );

  return prisma;
};

export type ExtendedPrismaClient = ReturnType<typeof createDatabaseManager>;
