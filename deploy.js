import FtpDeploy from 'ftp-deploy';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ftpDeploy = new FtpDeploy();

const config = {
    user: process.env.FTP_USER,
    password: process.env.FTP_PASS,
    host: process.env.FTP_HOST,
    port: parseInt(process.env.FTP_PORT || '21', 10),
    localRoot: path.join(__dirname, 'dist'),
    remoteRoot: process.env.FTP_REMOTE_PATH || '/httpdocs',
    include: ["*", "**/*"],
    exclude: [
        "dist/**/*.map",
        "node_modules/**",
        ".git/**",
        ".env"
    ],
    deleteRemote: false,
    forcePasv: true,
    sftp: false
};

console.log("Starting FTP deployment to Hosttech...");
console.log(`Host: ${config.host}`);
console.log(`User: ${config.user}`);
console.log(`Remote Path: ${config.remoteRoot}`);

ftpDeploy
    .deploy(config)
    .then((res) => {
        console.log("\nDeployment completed successfully!");
        console.log(`Uploaded files: ${res.length}`);
    })
    .catch((err) => {
        console.error("\nDeployment failed:", err);
        process.exit(1);
    });

// Log progress
ftpDeploy.on("uploading", function (data) {
    process.stdout.write(`Uploading: ${data.transferredFileCount}/${data.totalFilesCount} - ${data.filename}\r`);
});
ftpDeploy.on("uploaded", function (data) {
    // line break on complete
});
ftpDeploy.on("log", function (message) {
    console.log(message);
});
ftpDeploy.on("upload-error", function (data) {
    console.error(`\nError uploading ${data.filename}:`, data.err);
});
