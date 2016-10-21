'use strict'

const Wreck = require('wreck')
const querystring = require('querystring')
const makeUnique = require('tfk-unique-array')
const envs = process.env
const pkg = require('../package.json')
const config = require('../config')

module.exports = function newsCollector (options) {
  const seneca = this

  seneca.add('cmd: collect-info, type:user', getNews)

  return {
    name: envs.PORTALEN_COLLECTOR_NEWS_TAG || 'portalen-collector-news'
  }
}

function getNews (args, callback) {
  const seneca = this
  const user = args.user
  var result = {
    system: pkg.name,
    type: 'news',
    user: user,
    data: []
  }
  const tags = args.roles.join(',')
  const query = {
    channel: config.channelId,
    tags: tags
  }

  const url = `${config.feedHostUrl}?${querystring.stringify(query)}`

  Wreck.get(url, {json: true}, (error, response, payload) => {
    if (error) {
      console.error(error)
    } else {
      result.data = makeUnique(payload.data)
      seneca.act('role: info, cmd: content-collected', {data: result})
    }
  })

  callback(null, {ok: true})
}
