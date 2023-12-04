import { Router } from "https://deno.land/x/oak/mod.ts";
import dbClient from "./mongodb.ts";
import { Flash } from "./datatypes.ts";

const router = new Router();

const flashCollection = dbClient.collection("flash");

const getAllFlash = async (ctx: RouterContext) => {
  const flash: Array<Flash> = await flashCollection.find();
  ctx.response.body = flash;
};

const createFlash = async (ctx: RouterContext) => {
  const { name, imgUrl, isRepeatable, description, size, price, isAvailable } =
    await ctx.request.body().value;
  const flash = Flash.parse({
    name,
    imgUrl,
    isRepeatable,
    description,
    size,
    price,
    isAvailable,
  });
  console.log(`${JSON.stringify(flash, null, 4)}`);
  const id = await flashCollection.insertOne(flash);
  flash._id = id;
  ctx.response.status = 201;
  ctx.response.body = flash;
};

router
  .get("/", (ctx) => {
    ctx.response.boxy = "hello world!";
  })
  .get("/flash", getAllFlash)
  .post("/flash", createFlash);
//.put("/flash/:id", updateFlash);

export default router;
