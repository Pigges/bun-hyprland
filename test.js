(async ()=>{
    const splash = await (await fetch('http://localhost:3000/splash')).json();
    console.log(splash.message);
    const resp = await fetch('http://localhost:3000/notify?args=' + encodeURI(JSON.stringify([
        1,
        10000,
        "rgb(ccffcc)",
        " " + splash.message
    ])));

    console.log(await resp.json());
})();