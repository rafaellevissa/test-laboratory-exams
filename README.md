# Test Laboratory Exams

This is a project made using _nodejs_ framework _adonisjs_. It's following the _rest api_ design for the http requests and design pattern _repository_ as a layer between the models and controllers.

You can visit at http://52.14.133.222 and see it running online.

## 👨🏻‍🔧 Install

After you download the project you need to create a _.env_ file based on _.env.example_ which is at the root folder, add your database credentials and install its dependencies.

```
npm install
```

With the database credentials at your _.env_ run the migrations

```
npm run migration:up
```

As the project is made with adonisjs you need to generate a unique key in order to carry on.

```
adonis generate:key
```

You have a app key in your _.env_ file, only need to up the application server

```
npm start
```

Open up your favorite browser type the application url and if everything went right you're ready to go 🥳🎉!

### Install with docker

if you prefer you also can run the project with docker, with the .env correctly set up run the following command to build a docker image

```
docker-composer build
```

As the image is built run up the container

```
docker-composer up -d
```

That's all that you need 🎉!