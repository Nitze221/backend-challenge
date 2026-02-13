import type { Context } from "hono";
import * as shellService from "./shellService.js";
import type { SeaShellContext } from "./validators/seashell.js";

// --- 3. The Controller Functions ---

export const listSeashells = async (c: Context) => {
  const shells = await shellService.listSeashells();
  return c.json(shells);
};

export const getSeashell = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

  try {
    const shell = await shellService.getSeashell(id);
    return c.json(shell);
  } catch (error) {
    return c.json({ error: "Seashell not found" }, 404);
  }
};

export const addSeashell = async (c: SeaShellContext) => {
  const data = c.req.valid("json");
  try {
    const newShell = await shellService.addSeashell(data);
    return c.json(newShell, 201);
  } catch (error) {
    return c.json({ error: "Failed to create seashell" }, 500);
  }
};

export const updateSeashell = async (c: SeaShellContext) => {
  const id = Number(c.req.param("id"));
  const data = c.req.valid("json");

  if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

  try {
    const updated = await shellService.updateSeashell(id, data);
    return c.json(updated);
  } catch (error) {
    return c.json({ error: "Seashell not found" }, 404);
  }
};

export const deleteSeashell = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

  try {
    await shellService.deleteSeashell(id);
    return c.json({ message: "Deleted successfully" });
  } catch (error) {
    return c.json({ error: "Seashell not found" }, 404);
  }
};