const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
    let url = ctx.url
    // ctx.response.type = 'html';
    if(url === "/"){
        ctx.body = '<h1>home Koa</h1>';
    }
    else if(url === "/about"){
        ctx.body = '<h2>about Koa</h2>';
    }
    else if(url === "/contact"){
        ctx.body = '<h2>contact Koa</h2>';
    }
  
});

app.listen(5000);