'use strict'

const envs = process.env

module.exports = {
  feedHostUrl: envs.NEWS_FEED_HOST_URL || 'https://news.portalen.no/artikler.json',
  channelId: envs.NEWS_FEED_CHANNEL_ID || 'news'
}
