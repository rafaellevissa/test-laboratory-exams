FROM node:14.4

COPY . /app
WORKDIR /app
RUN npm install --only=prod
ENTRYPOINT node ace migration:run && npm start
ENV PORTDOCKER=3344
EXPOSE 3344
