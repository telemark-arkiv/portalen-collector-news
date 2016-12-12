'use strict'

const Seneca = require('seneca')
const Mesh = require('seneca-mesh')
const News = require('tfk-seneca-collect-content')
const envs = process.env
const config = require('./config')
const pkg = require('./package.json')

const options = {
  seneca: {
    log: 'silent',
    tag: envs.PORTALEN_COLLECTOR_NEWS_TAG || 'portalen-collector-news-tag'
  },
  mesh: {
    auto: true,
    listen: [
      {pin: 'cmd:collect-info, type:user', model: 'observe'}
    ]
  },
  news: {
    type: 'news',
    system: pkg.name,
    channelId: config.channelId,
    feedHostUrl: config.feedHostUrl,
    verbose: true
  },
  isolated: {
    host: envs.PORTALEN_COLLECTOR_NEWS_HOST || 'localhost',
    port: envs.PORTALEN_COLLECTOR_NEWS_PORT || 8000
  }
}

const Service = Seneca(options.seneca)

if (envs.PORTALEN_COLLECTOR_NEWS_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(News, options.news)
