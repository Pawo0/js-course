import { Application, Context, Router } from "jsr:@oak/oak/";
import { Eta } from "https://deno.land/x/eta/src/index.ts";
import logger from "https://deno.land/x/oak_logger/mod.ts";

const app: Application = new Application();
const router: Router = new Router({});
const eta: Eta = new Eta({ views: `${Deno.cwd()}/views` });

interface StudentInterface {
    fname: string;
    lname: string;
    faculty: string;
}

const students: StudentInterface[] = [
    {
        fname: 'Jan',
        lname: 'Kowalski',
        faculty: 'WI'
    },
    {
        fname: 'Anna',
        lname: 'Nowak',
        faculty: 'WIET'
    },
    {
        fname: 'Piotr',
        lname: 'Zielinski',
        faculty: 'WIMiR'
    },
    {
        fname: 'Katarzyna',
        lname: 'Wojcik',
        faculty: 'WIET'
    },
    {
        fname: 'Marek',
        lname: 'Lewandowski',
        faculty: 'WI'
    },
    {
        fname: 'Magdalena',
        lname: 'Kowalczyk',
        faculty: 'WIET'
    },
    {
        fname: 'Tomasz',
        lname: 'Szymanski',
        faculty: 'WIMiR'
    },
    {
        fname: 'Agnieszka',
        lname: 'Krawczyk',
        faculty: 'WI'
    },
    {
        fname: 'Michał',
        lname: 'Witkowski',
        faculty: 'WIET'
    },
    {
        fname: 'Ewa',
        lname: 'Jankowska',
        faculty: 'WIMiR'
    }
];

router.get("/", (ctx: Context) => {
    const res: string = eta.render("./students", {
        students: students,
    });

    ctx.response.body = res;
})

app.use(logger.logger);
app.use(logger.responseTime);
app.use(router.routes());
app.use(router.allowedMethods());

console.log("App is listening to port: 8000");
await app.listen({ port: 8000 });
