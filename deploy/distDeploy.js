require('dotenv').config({
    path: '.env_deployment'
});

const {program} = require("commander");
const mime = require('mime-types')
const glob = require('glob');
const AWS = require("aws-sdk");
const {
    S3
} = require('aws-sdk');
const fs = require('fs');

program.requiredOption("-e, --env <s>").parse(process.argv);
const env =program.getOptionValue('env');


if(!(env == "staging" || env == "production")){
    throw Error("envの値が適切ではありません");
};
const bucketName = env == "staging" ? process.env.STAGING_BUCKET_NAME : process.env.PRODUCTION_BUCKET_NAME

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretKey: process.env.SECRET_KEY,
    region: process.env.REGION
});


(async function() {
    const files = await new Promise((resolve) => {
        glob('./dist/**/*.*', (e, files) => {
            resolve(files);
        });
    });
    const s3 = new S3();
    files.forEach(element => {
        const path = element.replace('./dist/', "");
        const contentType = mime.lookup(element);
        s3.putObject({
            Bucket: bucketName,
            Key: `telops/${path}`,
            Body: fs.readFileSync(element),
            ContentType: contentType
        }).promise().then((r) => {
            console.log(env+':'+path + "のデプロイに成功しました");
        }).catch((e) => {
            console.log(e);
            console.log(env+":デプロイに失敗しました。");
        });

    });
})();