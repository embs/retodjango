FROM node:8.11.3-alpine

WORKDIR tutor
ADD tutor/package* ./
RUN npm install && \
  npm install -g serve
ADD tutor/public/ public/
ADD tutor/src/ src/
ENV REACT_APP_SLATE_HOST http://localhost:3001
RUN sed '/homepage/d' package.json > package.tmp && \
  mv package.tmp package.json && \
  npm run build

CMD ["serve", "-s", "build"]
