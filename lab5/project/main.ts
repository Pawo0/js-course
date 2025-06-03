import { Application, Context, Router } from "jsr:@oak/oak/";
import { Eta } from "https://deno.land/x/eta/src/index.ts";
import logger from "https://deno.land/x/oak_logger/mod.ts";
import { studentsCollection } from "./db.ts";

const app: Application = new Application();
const router: Router = new Router({});
const eta: Eta = new Eta({ views: `${Deno.cwd()}/views` });

import { send } from "jsr:@oak/oak/send";

app.use(async (ctx, next) => {
  try {
    if (ctx.request.url.pathname.startsWith("/public")) {
      const path = ctx.request.url.pathname.replace("/public", "");
      await send(ctx, path, {
        root: `${Deno.cwd()}/public`,
      });
      return;
    }
    // Kontynuuj do następnej warstwy middleware
    await next();
  } catch {
    // W przypadku błędu, kontynuuj do następnego middleware
    await next();
  }
});

router
  .get("/", (ctx: Context) => {
    const res: string = eta.render("./index", { usos: false });

    ctx.response.body = res;
  })
  .get("/usos", (ctx: Context) => {
    const res: string = eta.render("./index", { usos: true });
    ctx.response.body = res;
  })
  .get("/api/students", async (ctx) => {
    const students = await studentsCollection.find({}).project({ _id: 0 })
      .toArray();

    if (!students) {
      ctx.response.status = 404;
      ctx.response.body = "No students found";
      return;
    }

    ctx.response.body = students[0];
  })
    .post("/api/students/update", async (ctx) => {
      try {
        const body = await ctx.request.body.json();

        const studentsJson = body.students;

        if (!studentsJson) {
          ctx.response.status = 400;
          ctx.response.body = { error: "Brak danych studentów w żądaniu" };
          return;
        }

        await studentsCollection.deleteMany({});
        await studentsCollection.insertOne(studentsJson);

        ctx.response.status = 200;
        ctx.response.body = { success: true };

      } catch (e) {
        console.error("Błąd aktualizacji danych:", e);
        ctx.response.status = 500;
        ctx.response.body = { error: "Błąd aktualizacji danych w bazie" };
      }
    });

app.use(logger.logger);
app.use(logger.responseTime);
app.use(router.routes());
app.use(router.allowedMethods());

console.log("App is listening to port: 8000");
await app.listen({ port: 8000 });
