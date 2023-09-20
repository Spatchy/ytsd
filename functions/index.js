const { google } = require("googleapis")

async function main () {
  const authClient = new google.auth.OAuth2({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret
  })

  authClient.setCredentials({
    refresh_token: process.env.refreshToken
  })

  const youtube = google.youtube({
    auth: authClient,
    version: "v3"
  })


  const videoId = process.env.videoId

  const videoRes = await youtube.videos.list({
    id: videoId,
    part: 'snippet,statistics'
  })

  console.log(JSON.stringify(videoRes, null, 2))
}

main()