###########################################################
#
# Dockerfile for portalen-collector-news
#
###########################################################

# Setting the base to nodejs 4.4.4
FROM mhart/alpine-node:4.4.4

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV PORTALEN_COLLECTOR_NEWS_TAG portalen-collector-news
ENV PORTALEN_COLLECTOR_NEWS_URL http://portalen.collector.news.no
ENV PORTALEN_COLLECTOR_NEWS_HOST localhost
ENV PORTALEN_COLLECTOR_NEWS_PORT 8000
ENV NEWS_FEED_HOST_URL http://portalen.collector.news.no
ENV NEWS_FEED_CHANNEL_ID news

# Startup
CMD ["node", "service.js", "--seneca-log=type:act"]