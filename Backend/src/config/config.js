// config/config.js
module.exports = {
    development: {
      username: 'eccargo-test',
      password: 'Pool113*',
      database: 'eccargo-test_task',
      host: 'postgresql-eccargo-test.alwaysdata.net',
      dialect: 'postgres', // Cambia esto según tu base de datos
    },
    test: {
      username: 'eccargo-test',
      password: 'Pool113*',
      database: 'eccargo-test_task',
      host: 'postgresql-eccargo-test.alwaysdata.net',
      dialect: 'postgres', // Cambia esto según tu base de datos
    },
    production: {
      username: 'eccargo-test',
      password: 'Pool113*',
      database: 'eccargo-test_task',
      host: 'postgresql-eccargo-test.alwaysdata.net',
      dialect: 'postgres', // Cambia esto según tu base de datos
    },
    aws3BaseUrl : 'https://g33tysr3x7.execute-api.us-east-2.amazonaws.com/default/getImages',
  };