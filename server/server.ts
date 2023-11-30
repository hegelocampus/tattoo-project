import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import router from "./routes.ts";
import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";

// Setup server
const app = new Application();
const PORT = 3000;

app.use(router.routes());
app.use(router.allowedMethods());

// Setup logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.listen({ port: PORT });
console.log(`Server listening on port ${PORT}`);


