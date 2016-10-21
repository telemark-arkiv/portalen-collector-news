'use strict'
process.env.NEWS_FEED_HOST_URL = 'https://info.portalen.t-fk.no/artikler.json'
const envs = process.env

module.exports = {
  feedHostUrl: envs.NEWS_FEED_HOST_URL || 'https://info.portalen.no/artikler.json',
  channelId: envs.NEWS_FEED_CHANNEL_ID || 'news'
}
