'use strict'

var envs = process.env

var config = {
  feedHostUrl: envs.NEWS_FEED_HOST_URL || 'https://news.portalen.no/artikler.json',
  channelId: envs.NEWS_FEED_CHANNEL_ID || 'news'
}

module.exports = config
