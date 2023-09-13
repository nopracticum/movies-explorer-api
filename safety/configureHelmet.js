// const sessionSecretKey = process.env.SESSION_SECRET_KEY || 'defaultSecretKey';

const helmet = require('helmet');
// const session = require('express-session');
// const cookieSession = require('cookie-session');

// const { NODE_ENV } = process.env;

const configureHelmet = (app) => {
  // app.set('trust proxy', 1); // Доверять первому прокси-серверу

  // app.use(
  //   session({
  //     secret: sessionSecretKey, // Секретный ключ для шифрования сессии
  //     name: 'sessionId', // Имя сессионной куки
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );

  // const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 час

  // app.use(
  //   cookieSession({
  //     name: 'session',
  //     keys: ['key1', 'key2'],
  //     cookie: {
  //       secure: NODE_ENV === 'production', // Требовать безопасного соединения (HTTPS)
  //       httpOnly: true, // Запретить доступ к куке через JavaScript
  //       // domain: 'example.com', // Домен, для которого кука будет доступна
  //       // path: 'foo/bar', // Путь, для которого кука будет доступна
  //       expires: expiryDate, // Время истечения срока действия куки
  //     },
  //   }),
  // );

  app.use(helmet()); // Использовать модуль helmet для обеспечения безопасности приложения
  app.disable('x-powered-by'); // Отключить заголовок "x-powered-by" для скрытия информации о сервере
};

module.exports = configureHelmet;
