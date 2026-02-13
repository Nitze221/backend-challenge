import { OpenAPIHono } from "@hono/zod-openapi";
import * as route from './routes.js'
import * as shellController from "./shellController.js";

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

export default app;