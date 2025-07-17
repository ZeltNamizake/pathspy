const axios = require("axios");
const readline = require('readline');
const fs = require("fs");

// Argument parsing
const baseURL = process.argv[2];
const args = process.argv.slice(3);

const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    cyan: "\x1b[36m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    gray: "\x1b[90m"
};

let save200File = null;
let saveAllFile = null;

args.forEach((arg, i) => {
    if (arg === "--save" && args[i + 1]) save200File = args[i + 1];
    if (arg === "--save-all" && args[i + 1]) saveAllFile = args[i + 1];
});

if (!baseURL || baseURL.startsWith("-")) {
    if (baseURL === "--help") {
        console.log(`
██████╗░░█████╗░████████╗██╗░░██╗${colors.red} ██████╗██████╗░██╗░░░██╗${colors.reset}
██╔══██╗██╔══██╗╚══██╔══╝██║░░██║${colors.red}██╔════╝██╔══██╗╚██╗░██╔╝${colors.reset}
██████╔╝███████║░░░██║░░░███████║${colors.red}╚█████╗░██████╔╝░╚████╔╝░${colors.reset}
██╔═══╝░██╔══██║░░░██║░░░██╔══██║${colors.red} ╚═══██╗██╔═══╝░░░╚██╔╝░░${colors.reset}
██║░░░░░██║░░██║░░░██║░░░██║░░██║${colors.red}██████╔╝██║░░░░░░░░██║░░░${colors.reset}
╚═╝░░░░░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝${colors.red}╚═════╝░╚═╝░░░░░░░░╚═╝░░░${colors.reset} by ZeltNamizake
    PathSpy - Endpoint Scanner & Response Checker

Usage: node pathspy.js <base_url> [options]

Options:
  --save <file.txt>       Save only status 200 OK responses to file
  --save-all <file.txt>   Save all responses (including 403, 404, 500, ERR)
  --help                  Show this help message

Example:
  node pathspy.js http://example.com
  node pathspy.js http://example.com --save hits.txt
  node pathspy.js http://example.com --save-all full_log.txt
  node pathspy.js http://example.com --save hits.txt --save-all full_log.txt
        `);
    } else {
        console.log(
            `pathspy: missing operand\nTry 'node pathspy.js --help' for more information`
        );
    }
    process.exit(1);
}

async function pathspy(baseURL) {
    const endpointList = fs
        .readFileSync("wordlist.txt", "utf8")
        .split("\n")
        .filter(Boolean);

    console.log(`\n🔍 Scanning ${endpointList.length} paths on ${baseURL}\n`);

    const save200List = [];
    const saveAllList = [];

    for (const path of endpointList) {
        const fullURL = `${baseURL.replace(/\/+$/, "")}/${path.trim()}`;
        const start = Date.now();

        try {
            const res = await axios.get(fullURL, {
                timeout: 8000,
                validateStatus: () => true
            });

            const ms = Date.now() - start;
            const status = res.status;

            let color = colors.gray;
            if (status === 200) color = colors.green;
            else if (status >= 300 && status < 400) color = colors.cyan;
            else if (status === 403) color = colors.yellow;
            else if (status === 500) color = colors.red;

            const resultLine = `[${status}] ${fullURL} (${ms} ms)`;
	    if(resultLine.includes("200") && status === 200){
              console.log(`\r${color}${resultLine}${colors.reset}`);
            }else {
             readline.clearLine(process.stdout, 0);
             readline.cursorTo(process.stdout, 0);
	     process.stdout.write(`\r${color}${resultLine}${colors.reset}`)
            }

            if (status === 200) save200List.push(resultLine);
            saveAllList.push(resultLine);
        } catch (err) {
            const errLine = `[ERR] ${fullURL} → ${err.code || err.message}`;
            console.log(`\r${colors.red}${errLine}${colors.reset}`);
            saveAllList.push(errLine);
        }
    }

    if (save200File && save200List.length > 0) {
        fs.writeFileSync(save200File, save200List.join("\n"));
        console.log(
            `\n✅ Saved ${save200List.length} result(s) with status 200 to: ${save200File}`
        );
    } else if (save200File) {
        console.log(`\n⚠️ No 200 OK found. Nothing saved to ${save200File}`);
    }

    if (saveAllFile && saveAllList.length > 0) {
        fs.writeFileSync(saveAllFile, saveAllList.join("\n"));
        console.log(
            `✅ Saved all ${saveAllList.length} results to: ${saveAllFile}`
        );
    }
}

pathspy(baseURL);
