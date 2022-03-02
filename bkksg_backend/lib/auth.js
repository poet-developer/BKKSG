const fs = require('fs')
const path = require('path')
const readline = require('readline')
const {google} = require('googleapis');
const { drive } = require('googleapis/build/src/apis/drive')
const request =  require('request')


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const DIR_NAME = './public/images'

// 스코프 : 보안
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
//보안
module.exports = {
    // Load client secrets from a local file.
  init: function(){
    return new Promise((resolve, reject) =>{
      fs.readFile('credentials.json', (err, content) => {
        if (err) return reject(new Error('Error loading client secret file:'));
        // Authorize a client with credentials, then call the Google Drive API.
        resolve(JSON.parse(content))
      });
    })
    .then(authorize)
    .catch(getAccessToken)
  

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials) {
      return new Promise((resolve, reject) => {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
          client_id, client_secret, redirect_uris[0]);

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) {
            reject(oAuth2Client);
          }else {
            oAuth2Client.setCredentials(JSON.parse(token));
            resolve(oAuth2Client);
          }
        });
      })
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    function getAccessToken(oAuth2Client) {
      return new Promise( (resolve, reject) => {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });

        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) return console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            resolve(oAuth2Client);
          });
        });
      })
      
    }

    /**
     * Lists the names and IDs of up to 10 files.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    
    function listFiles(auth) {
      return new Promise((resolve, reject) => {
        const drive = google.drive({version: 'v3', auth});
        // uploadFile(filePath, drive)
        const fileInfo =  getFile(drive);
        // downloadFile(drive);
        drive.files.list({
          pageSize: 10,
          fields: 'nextPageToken, files(id, name)',
        }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          const files = res.data.files;
          if (files.length) {
            console.log(files);
            resolve([drive, files, fileInfo]);
          } else {
            reject( new Error('no files found'));
          }
        });
      })
    }
    //구글 드라이브 파일 리스트 읽어오기

    async function uploadFile(filePath, drive) {
      try {
        const response = await drive.files.create({
          requestBody : {
            name : 'purple.png',
            mimeType : 'image/png'
          },
          media: {
            mimeType : 'image/png',
            body : fs.createReadStream(filePath)
          }
        })

        console.log(response.data);
      } catch (error) {
          console.log(error.message)

      }
    }
    // 파일 업로드 함수 

    async function getFile(drive) {

      try {
        const fileId = '.';
        const dest = fs.createWriteStream('/tmp/photo.png');
        const response = await drive.files.get({
          fileId: fileId,
          fields: '*',
        },
        )
        // console.log(response.data);
       return response

      }catch (error) {
        console.log(error.message)
      }
    }

    function downloadFile(drive) {
      const fileId = '1yK1zORZuCxAW5-Gunie7MQ--E7KXAjRZ';
      drive.files.get({
        fileId: fileId,
        alt: 'media'
      }, { responseType: "arraybuffer" },
      function(err, { data }) {
        fs.writeFile("./tmp/sample.png", Buffer.from(data), err => {
          if (err) console.log(err);
        });
      });
    }

    function deleteFile(drive, fileId) {
      drive.files.delete({
        'fileId': fileId
      })
    }
}
}

