import Bao from "baojs";
import hyprland, {ctl} from "./hyprland.js";

const app = new Bao();

app.get('/', async (ctx) => {
    const doc = Bun.file("./src/index.html");
    const resp = new Response(await doc.text());
    resp.headers.set('Content-Type', 'html')
    return ctx.sendRaw(resp);
})

app.get("/:command", async (ctx) => {
    const resp = await hyprland[ctx.params.command](JSON.parse(ctx.query.get('args')) || []);
    return ctx.sendJson(resp);
});

app.post("/:command", async (ctx) => {
    const body = ctx.req.body ? await ctx.req.json() : {};
    console.log(body.args);
    const resp = await hyprland[ctx.params.command](body.args || []);
    return ctx.sendJson(resp);
});


app.listen();