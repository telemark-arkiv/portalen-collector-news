'use strict'
const envs = process.env

module.exports = {
  feedHostUrl: envs.NEWS_FEED_HOST_URL || 'https://info.portalen.t-fk.no/artikler.json',
  channelId: envs.NEWS_FEED_CHANNEL_ID || 'news',
  newsServiceTag: envs.NEWS_SERVICE_TAG || 'collector-news-service'
}
