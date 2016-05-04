'use strict'

var Wreck = require('wreck')
var querystring = require('querystring')
var makeUnique = require('tfk-unique-array')
var envs = process.env
var pkg = require('../package.json')
var config = require('../config')
var wreckOptions = {
  json: true
}

module.exports = function (options) {
  var seneca = this

  seneca.add('cmd:collect-info, type:user', getNews)

  return {
    name: envs.PORTALEN_COLLECTOR_NEWS_TAG || 'portalen-collector-news'
  }
}

function getNews (args, callback) {
  var seneca = this
  var user = args.user
  var result = {
    system: pkg.name,
    type: 'news',
    user: user,
    data: []
  }
  var tags = args.roles.join(',')
  var query = {
    channel: config.channelId,
    tags: tags
  }
  var url = config.feedHostUrl + '?' + querystring.stringify(query)

  Wreck.get(url, wreckOptions, function (error, response, payload) {
    if (error) {
      console.error(error)
    } else {
      result.data = makeUnique(payload.data)
      seneca.act({info: 'info', type: 'info', data: result})
    }
  })

  callback(null, {ok: true})
}
