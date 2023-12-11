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
  try {
    const flash = await flashCollection.findOne({
      _id: new ObjectId(ctx.params.id),
    });
    ctx.response.body = flash;
    ctx.assert(
      flash !== null,
      Status.NotFound,
      "No item with that ID found!",
    );
  } catch (BSONError) {
    ctx.response.status = Status.NotFound;
  }
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

  const id = await flashCollection.insertOne(flash);
  flash._id = id;
  ctx.response.status = 201;
  ctx.response.body = flash;
};

// TODO: We probably wan to set this up to take the current user to do some
// sort of auth check to make sure they're allowed to update this flash.
const updateFlash = async (ctx: RouterContext) => {
  const { name, imgUrl, isRepeatable, description, size, price, isAvailable } =
    await ctx.request.body().value;
  // We're building this out into a Flash object to validate it, but we also
  // use this as our return value.
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

  const filter = { _id: new ObjectId(ctx.params.id) };
  const update = {
    $set: {
      name,
      imgUrl,
      isRepeatable,
      description,
      size,
      price,
      isAvailable,
    },
  };

  const result = await flashCollection.updateOne(filter, update);
  console.log(result);

  // This should never happen, but if someone tries to update something that
  // doesn't exist, don't let them
  ctx.assert(
    result.matchedCount != 1,
    Status.NotFound,
  );

  const flash = parseResult.data;
  flash._id = ctx.params.id;
  ctx.response.status = 200;
  ctx.response.body = flash;
};

router
  .get("/", (ctx) => {
    ctx.response.boxy = "hello world!";
  })
  .get("/api/flash", getAllFlash)
  .get("/api/flash/:id", getFlash)
  .post("/api/flash", createFlash)
  .put("/api/flash/:id", updateFlash);

export default router;
