const simple = [
    "monitors",
    "workspaces",
    "activeworkspace",
    "clients",
    "activewindow",
    "layers",
    "devices",
    "binds",
    "splash",
    "version",
    "reload",
    "getoption",
    "cursorpos",
    "animations",
    "plugin",
    "notify"
]

const commands = {};

simple.forEach(command=>{
    commands[command] = async (args=[])=>{
        return await ctl(true, command, args); // Get output from hyprctl
    }
})

commands.dispatch = async (args=[])=>{
    return await ctl(false, 'dispatch', args); // Get output from hyprctl
}

export default commands

export async function ctl(json, command, args=[]) {
    const cmd = ["hyprctl", command].concat(args); // Create the command to send
    if (json) cmd.splice(2, 0, '-j'); // Add -j flag if we want json format
    const proc = Bun.spawnSync(cmd); // Execute command

    let resp;
    try {
        resp = JSON.parse(proc.stdout.toString()); // Can we parse it as JSON?
    } catch(err) {
        resp = {message: proc.stdout.toString().replaceAll('\n', '')} // Else just return it as a object with a message as string
    }

    return resp;
}