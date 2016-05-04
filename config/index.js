'use strict'
process.env.NEWS_FEED_HOST_URL = 'http://dev.telemarkportalen.vpdev.no/artikler.json'
var envs = process.env

var config = {
  feedHostUrl: envs.NEWS_FEED_HOST_URL || 'https://news.portalen.no/artikler.json',
  channelId: envs.NEWS_FEED_CHANNEL_ID || 'news'
}

module.exports = config
