const { google } = require("googleapis")

async function main () {

  const calculateRemainingTime = (viewsAtLastCheck, likesAtLastCheck, timerAtLastCheck, currentViews, currentLikes) => {
    const newViews = currentViews - viewsAtLastCheck
    const newLikes = currentLikes - likesAtLastCheck
    const tickedTimer = timerAtLastCheck - 600 // runs every 10 minutes so remove 10 minutes from timer
    const finalTimer = tickedTimer + (newViews * 30) + (newLikes * 60)
    if (finalTimer <= 0) {
      destroyVideo()
    }
    return finalTimer
  }

  const stringifyTimerToHours = (timer) => {
    const timerInHours = timer / 3600
    return (Math.round(timerInHours * 10) / 10).toFixed(1)
  }

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

  const { statistics, snippet } = videoRes.data.items[0]


  let tagsObject = {}
  snippet.tags.forEach(tag => {
    splitTag = tag.split("=")
    tagsObject = {
      ...tagsObject,
      [splitTag[0]]:splitTag[1]
    }
  })

  // 48 hours = 172800
  const timer = calculateRemainingTime(
    tagsObject.savedViews,
    tagsObject.savedLikes,
    tagsObject.savedTimer,
    statistics.viewCount,
    statistics.likeCount
  )

  const stringifiedTimer = stringifyTimerToHours(timer)

  const newTitle = `This video will self destruct in ${stringifiedTimer} hours`
  const newTags = [
    `savedViews=${statistics.viewCount}`,
    `savedTimer=${timer}`,
    `savedLikes=${statistics.likeCount}`
  ]

  console.log(newTitle)
  console.log(newTags)

}

main()