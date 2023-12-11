import { Router, Status } from "https://deno.land/x/oak/mod.ts";
import dbClient from "./mongodb.ts";
import { ObjectId } from "npm:mongodb@6.3";
import { Flash } from "./datatypes.ts";

const router = new Router();

const flashCollection = dbClient.collection("flash");

const getAllFlash = async (ctx: RouterContext) => {
  const flash: Array<Flash> = await flashCollection.find();
  ctx.response.body = flash;
};

const getFlash = async (ctx: RouterContext) => {
  const flash = await flashCollection.findOne({
    _id: new ObjectId(ctx.params.id),
  });
  ctx.response.body = flash;
};

const createFlash = async (ctx: RouterContext) => {
  const { name, imgUrl, isRepeatable, description, size, price, isAvailable } =
    await ctx.request.body().value;
  const parseResult = await Flash.safeParseAsync({
    name,
    imgUrl,
    isRepeatable,
    description,
    size,
    price,
    isAvailable,
  });
  ctx.assert(
    parseResult.success,
    Status.NotAcceptable,
    JSON.stringify(parseResult.error),
  );
  const flash = parseResult.data;

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
  .get("/api/flash", getAllFlash)
  .get("/api/flash/:id", getFlash)
  .post("/api/flash", createFlash);
//.put("/api/flash/:id", updateFlash);

export default router;
