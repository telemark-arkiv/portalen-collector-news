'use strict'

var Seneca = require('seneca')
var Mesh = require('seneca-mesh')
var News = require('./lib/news')
var envs = process.env

var options = {
  seneca: {
    tag: envs.PORTALEN_COLLECTOR_NEWS_TAG || 'portalen-collector-news-tag'
  },
  mesh: {
    auto: true,
    listen: [
      {pin: 'cmd:collect-info, type:user', model: 'observe'}
    ]
  },
  news: {
    url: envs.PORTALEN_COLLECTOR_NEWS_URL || 'http://news.no'
  },
  isolated: {
    host: envs.PORTALEN_COLLECTOR_NEWS_HOST || 'localhost',
    port: envs.PORTALEN_COLLECTOR_NEWS_PORT || 8000
  }
}

var Service = Seneca(options.seneca)

if (envs.PORTALEN_COLLECTOR_NEWS_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(News, options.news)
