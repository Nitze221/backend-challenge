import { OpenAPIHono } from "@hono/zod-openapi";
import * as shellController from "./shellController.js";
import { createValidator, updateValidator } from "./validators/seashell.js";

const app = new OpenAPIHono();

app.get("/seashells", shellController.listSeashells);
app.get("/seashells/:id", shellController.getSeashell);

app.post(
  "/seashells", 
  createValidator, 
  shellController.addSeashell
);

app.put(
  "/seashells/:id", 
  updateValidator, 
  shellController.updateSeashell
);

app.delete("/seashells/:id", shellController.deleteSeashell);

export default app;