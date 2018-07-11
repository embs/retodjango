FROM node:8.11.3-alpine

WORKDIR pupil
ADD pupil/package* ./
RUN npm install
ADD pupil/*.js ./

CMD ["npm", "test"]
