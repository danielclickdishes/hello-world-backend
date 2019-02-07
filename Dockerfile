FROM node:10-alpine

ARG NPM_TOKEN

ENV PORT 3000
ENV NODE_ENV production

WORKDIR /home/node/app

COPY package*.json ./
COPY .npmrc ./

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --only=production --loglevel=warn && \
    npm cache clean --force --loglevel=silent

COPY . .

RUN rm -f .npmrc

# RUN chmod -R 777 /home/node/app/public/uploads
# RUN chown -R node /home/node/app/public/uploads

ENV PATH=$PATH:/home/node/app/node_modules/.bin

# USER node

EXPOSE 3000

ENTRYPOINT [ "sh", "-c" ]
CMD [ "node", "index.js" ]
