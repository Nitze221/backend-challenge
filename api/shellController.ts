import * as shellService from "./shellService.js";
import * as route from "./routes.js"
import type { RouteHandler } from "@hono/zod-openapi";

// --- 3. The Controller Functions ---

const listSeashells: RouteHandler<typeof route.getAll> = async (c) => {
  const shells = await shellService.listSeashells();
  return c.json(shells, 200);
};

const getSeashell: RouteHandler<typeof route.getOne> = async (c) => {
  const { id } = c.req.valid("param");
  try {
    const shell = await shellService.getSeashell(id);
    return c.json(shell, 200);
  } catch (error) {
    return c.json({ error: "Seashell not found" }, 404);
  }
};

const addSeashell: RouteHandler<typeof route.createSeashell> = async (c) => {
  const data = c.req.valid("json");

  try {
    const newShell = await shellService.addSeashell(data);
    return c.json(newShell, 201);
  } catch (error) {
    return c.json({ error: "Failed to create seashell" }, 500);
  }
};

const updateSeashell: RouteHandler<typeof route.updateSeashell> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");

  try {
    const updated = await shellService.updateSeashell(id, data);
    return c.json(updated, 200);
  } catch (error) {
    return c.json({ error: "Seashell not found" }, 404);
  }
};

const deleteSeashell: RouteHandler<typeof route.deleteSeashell> = async (c) => {
  const { id } = c.req.valid("param");

  try {
    await shellService.deleteSeashell(id);
    return c.json({ message: "Deleted successfully" }, 200);
  } catch (error) {
    return c.json({ error: "Seashell not found" }, 404);
  }
};

export {listSeashells,
  getSeashell,
  addSeashell,
  updateSeashell,
  deleteSeashell
}