const INTERNAL_SERVER_ERROR = 500;

const SUCCESS_STATUS = 200;

const CREATED_STATUS = 201;
const INVALID_MOVIE_DATA = 'Переданы некорректные данные при создании фильма.';
const INVALID_MOVIE_ID = 'Передан неверный формат _id фильма.';
const DELETE_MOVIE_FORBIDDEN = 'Нет прав для удаления фильма с указанным _id.';
const MOVIE_NOT_FOUND = 'Передан несуществующий _id фильма.';
const MOVIE_DELETED = 'Фильм удалён.';

const INVALID_USER_DATA = 'Переданы некорректные данные при создании пользователя';
const CONFLICT_EMAIL = 'Пользователь с таким email уже зарегистрирован';
const UNAUTHORIZED = 'Переданы неверные email или пароль';
const LOGOUT_SUCCESS = 'Вы успешно вышли из системы';
const INVALID_USER_UPDATE_DATA = 'Переданы некорректные данные при обновлении пользователя.';

const DEFAULT_ERROR_MESSAGE = 'Ошибка по умолчанию.';
const AUTHORIZATION_REQUIRED = 'Необходима авторизация';
const ROUTE_NOT_FOUND = 'Маршрут не найден';
const INVALID_ADDRESS = 'Некорректный адрес';
const INVALID_EMAIL = 'Некорректный e-mail';
const RATE_LIMIT_EXCEEDED = 'Превышен лимит запросов. Попробуйте позже.';

module.exports = {
  INTERNAL_SERVER_ERROR,
  SUCCESS_STATUS,
  CREATED_STATUS,
  INVALID_MOVIE_DATA,
  INVALID_MOVIE_ID,
  DELETE_MOVIE_FORBIDDEN,
  MOVIE_NOT_FOUND,
  MOVIE_DELETED,
  INVALID_USER_DATA,
  CONFLICT_EMAIL,
  UNAUTHORIZED,
  LOGOUT_SUCCESS,
  INVALID_USER_UPDATE_DATA,
  DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_REQUIRED,
  ROUTE_NOT_FOUND,
  INVALID_ADDRESS,
  INVALID_EMAIL,
  RATE_LIMIT_EXCEEDED,
};
