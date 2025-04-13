FROM node:slim
WORKDIR /presale
COPY src ./src/
COPY public ./public/
COPY .env ./
COPY next.config.ts ./
COPY *.json ./
RUN yarn
RUN yarn build
EXPOSE 5677
ENTRYPOINT yarn start -p 5500