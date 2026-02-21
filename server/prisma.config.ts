import { defineConfig } from "prisma/config";

export default defineConfig({
    datasource: {
        // Standard connection for Prisma 7
        url: process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/placeholder",
    },
});
