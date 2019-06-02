const fs = require('fs');
const path = require('path');

const BUILD_GRADLE_PATH = path.join(__dirname, '../android/app/build.gradle');

const buildConfig = fs.readFileSync(BUILD_GRADLE_PATH).toString();

const versionCodeRegex = /versionCode *([0-9]+)/g;
const versionNameRegex = /versionName *["']([0-9]+)\.([0-9]+)["']/g;

let output = buildConfig;

output = output.replace(versionCodeRegex, () => `versionCode ${process.env.BUILD_NUMBER}`);
output = output.replace(versionNameRegex, (match, majorVersion) => `versionName "${majorVersion}.${process.env.BUILD_NUMBER}"`);

console.log('## ANDROID BUILD NUMBER IS:', process.env.BUILD_NUMBER);
console.log('## ANDROID VERSION NAME IS:', `"X.${process.env.BUILD_NUMBER}"`);

fs.writeFileSync(BUILD_GRADLE_PATH, output);