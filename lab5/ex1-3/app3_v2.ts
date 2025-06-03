import { Application, Context, Router } from "jsr:@oak/oak/";
import { Eta } from "https://deno.land/x/eta/src/index.ts";
import logger from "https://deno.land/x/oak_logger/mod.ts";
import { studentsCollection } from "./db.ts";

const app: Application = new Application();
const router: Router = new Router({});
const eta: Eta = new Eta({ views: `${Deno.cwd()}/views` });

router
  .get("/", async (ctx) => {
    const students = await studentsCollection.find({}).toArray();


    if (!students) {
      ctx.response.status = 404;
      ctx.response.body = "No students found";
      return;
    }


    const res: string = eta.render("./students", {
      students: students,
    });

    ctx.response.body = res;
  })
    .get("/:faculty", async (ctx) => {
    const faculty = ctx.params.faculty;

    if (!faculty) {
      ctx.response.status = 400;
      ctx.response.body = "Faculty parameter is required";
      return;
    }

    const students = await studentsCollection.find({
      faculty: { $regex: `^${faculty}$`, $options: "i" },
    }).toArray();

    if (!students || students.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = `No students found for faculty: ${faculty}`;
      return;
    }

    const res: string = eta.render("./students", {
      students: students,
    });

    ctx.response.body = res;
  });

app.use(logger.logger);
app.use(logger.responseTime);
app.use(router.routes());
app.use(router.allowedMethods());

console.log("App is listening to port: 8000");
await app.listen({ port: 8000 });
