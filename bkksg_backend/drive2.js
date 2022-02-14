const { google } = require("googleapis");
const fs = require("fs");
const { content } = require("googleapis/build/src/apis/content");

const TOKEN_RATH = "token.json";

fs.readFile("credentials.json", (err, content) => {
  if (err) console.log("Error loading client secret file:");
  fs.readFile(TOKEN_RATH, (err1, tokens) => {
    if (err1) console.log("Error loading tokens");
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const RF_TOKEN = JSON.parse(tokens).refresh_token;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    oAuth2Client.setCredentials({ refresh_token: RF_TOKEN });
  });
});
