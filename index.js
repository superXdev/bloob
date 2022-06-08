const { exec } = require("child_process");
const md5 = require('md5');
const fs = require('fs');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function execCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
}

(async function() {
    while(true) {
        const randomNumber = Math.floor(Math.random() * 10000000);

        const decision = Math.floor(Math.random() * 2);

        const file = (decision === 1) ? './foo.txt' : './bar.txt';

        console.log(`Writing on ${file} file`)
        
        fs.writeFileSync(file, md5(randomNumber), () => {});

        execCommand(`git commit -am "Modif ${file} file content (${md5(randomNumber)})"`)
        execCommand(`git push https://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@github.com/superXdev/bloob.git`)

        await sleep(5000)
    }
})();


