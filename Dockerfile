FROM node:18-alpine AS build

WORKDIR /tmp_back
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install --production
RUN npm install typescript -g
COPY . .
RUN npx tsc -b ./tsconfig.json

FROM node:18-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production
COPY --from=build /tmp_back/dist ./
EXPOSE 4000
CMD ["node", "./infra"]
