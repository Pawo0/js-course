import { Application, Context, Router } from "jsr:@oak/oak/";
import { Eta } from "https://deno.land/x/eta/src/index.ts";
import logger from "https://deno.land/x/oak_logger/mod.ts";

const app: Application = new Application();
const router: Router = new Router({});
const eta: Eta = new Eta({ views: `${Deno.cwd()}/views` });

interface Guestbook {
  name: string;
  tresc: string;
}

router
  .get("/", (ctx: Context) => {
    const list: Guestbook[] = JSON.parse(
      Deno.readTextFileSync("./public/ksiega.json"),
    );
    const res: string = eta.render("./guestbook", {
      list: list,
    });
    ctx.response.body = res;
  })
  .post("/submit", async (ctx: Context) => {
    try {
      const formData: URLSearchParams = await ctx.request.body.form();

      const name: string | null = formData.get("name");
      const tresc: string | null = formData.get("tresc");

      if (!name || !tresc) {
        ctx.response.status = 400;
        ctx.response.body = "Wymagane jest podanie imienia i tresci wpisu.";
        return;
      }
      const newEntry: Guestbook = { name, tresc };
      const list: Guestbook[] = JSON.parse(
        Deno.readTextFileSync("./public/ksiega.json"),
      );

      list.push(newEntry);

      await Deno.writeFile(
        "./public/ksiega.json",
        new TextEncoder().encode(JSON.stringify(list, null, 2)),
      );
      ctx.response.redirect("/");
    } catch (error: any) {
      ctx.response.status = 500;
      ctx.response.body = "Blad przy dzialaniu z ksiega gosci: " +
        error.message;
    }
  });

app.use(logger.logger);
app.use(logger.responseTime);
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Guestbook app is listening to port: 8000");
await app.listen({ port: 8000 });
