const glob = require('glob');
const {
    exec,execSync
} = require('child_process');
const {program} = require("commander");

program.requiredOption("-e, --env <s>").parse(process.argv);
const env =program.getOptionValue('env');


if(!(env == "staging" || env == "production")){
    throw Error("envの値が適切ではありません");
};
const command = env == "staging" ? 'npm run build-staging-noclean -- --env id=' : 'npm run build-production-noclean -- --env id=';

(async function() {
    const files = await new Promise((resolve) => {
        glob('./telops/*', (e, files) => {
            resolve(files);
        });
    });

    files.forEach(element => {
        const id = element.replace('./telops/', "");
        exec(command + id, (err) => {
            if (err) {
                console.log(err);
                console.log(id + "の処理が失敗しました")
            } else
                console.log(id + "の処理が完了しました");
        });
    });
})();