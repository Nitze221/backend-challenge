import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Context } from "hono";

// We don't include 'id' because that is auto-generated.
const seashellSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  species: z.string().min(1, "Species is required"),
  description: z.string().optional().default(""), // Optional in input, but Prisma needs a string
  rarity: z.string().optional(), // Optional because Prisma has a default("common")
});

// Create a TypeScript type from the schema so we can use it in the Service
export type CreateSeashellDto = z.infer<typeof seashellSchema>;

// For POST: Requires all fields defined above
const createValidator = zValidator("json", seashellSchema, (result, c) => {
    if (!result.success) {
        const schema = seashellSchema.toJSONSchema()    

        return c.json({
            error: "Validation Failed",
            details: result.error.issues.map(issue => {
                return issue.message;
            }),
        }, 400);
    }
    // If success, do nothing (request continues to controller)
  });

// Tell typescript about zValidator middleware
export type SeaShellContext = Context<any, any, { out: { json: CreateSeashellDto } }>;

// For PUT/PATCH: Makes everything optional (e.g., just updating the rarity)
const updateValidator = zValidator("json", seashellSchema.partial(), (result, c) => {
    if (!result.success) {
        const schema = seashellSchema.toJSONSchema()    

        return c.json({
            error: "Validation Failed",
            details: result.error.issues.map(issue => {
                return issue.message;
            }),
        }, 400);
    }
    // If success, do nothing (request continues to controller)
  });

export {createValidator, updateValidator}