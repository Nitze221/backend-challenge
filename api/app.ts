import { OpenAPIHono } from "@hono/zod-openapi";
import * as route from './routes.js'
import * as shellController from "./shellController.js";
import { swaggerUI } from "@hono/swagger-ui";

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
        return c.json({
            error: "Invalid input",
            details: result.error.issues.map(issue => {
                return { [issue.path.join('.')]: issue.message };
            }),
        }, 400);
    }
  }
});

app.openapi(route.getAll, shellController.listSeashells);
app.openapi(route.getOne, shellController.getSeashell);

app.openapi(route.createSeashell, shellController.addSeashell);

app.openapi(route.updateSeashell, shellController.updateSeashell);

app.openapi(route.deleteSeashell, shellController.deleteSeashell);

const openApiDoc = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Seashells API",
    description: "A REST API for managing a seashell collection. Built with Hono, Zod, and Prisma.",
    contact: {
      name: "Niclas Cajander",
      url: "https://github.com/Nitze221/backend-challenge",
    },
  }
}

app.doc("/doc", openApiDoc);

app.get("/", swaggerUI({ url: "/doc" }))

export default app;