import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

const port = 8000;

app.get("/", (c) => {
    return c.text("Welcome to Seashell REST API\n");
})

app.post("/", (c) => {
    return c.text("All seashells\n");
})

console.log(`Running app on localhost:${port}`)

serve({
    fetch: app.fetch,
    port,
})


