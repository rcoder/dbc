const { AceBaseServer } = require('acebase-server');
const fs = require('fs');

const baseConfig = JSON.parse(fs.readFileSync(`${__dirname}/../conf/acebase.json`));

const dbConfig = {
    authentication: {
        enabled: false,
        allowUserSignup: false,
        defaultAdminPassword: process.env.DB_ADMIN_PASSWORD,
    },
    ...baseConfig,
};

const server = new AceBaseServer(dbConfig.dbname, dbConfig);

server.on('ready', () => {
    console.info(`AceBase server started on ${dbConfig.host}:${dbConfig.port}`);
});
