import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";
import path from "path";

const ca = fs.readFileSync(path.join(process.cwd(), "certs", "ca.pem")).toString();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: true,
    ca,
  },
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;