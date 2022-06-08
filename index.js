const { exec } = require("child_process");
const md5 = require('md5');
const fs = require('fs');

(function() {
    const randomNumber = Math.floor(Math.random() * 10000000);

    const decision = Math.floor(Math.random() * 2);

    const file = (decision === 1) ? './foo.txt' : './bar.txt';

    console.log(`Writing on ${file} file`)
    
    fs.writeFileSync(file, md5(randomNumber), () => {});

    exec(`git commit -am "Modif ${file} file content (${md5(randomNumber)})"`, (error, stdout, stderr) => {
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
})();


