export const MOVIES_URL = "https://api.nomoreparties.co";

export const routesWithHeader = ["/", "/movies", "/saved-movies", "/profile"];
export const routesWithoutBlueHeader = ["/movies", "/saved-movies", "/profile"];
export const routesWithFooter = ["/", "/movies", "/saved-movies"];
export const SCREEN_MD = 768;

//export const nameRegex = /^[A-Za-zА-Яа-я -]{2,}$/;
export const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}/;
// export const passwordRegex = /^[\w\W]{8,}$/;

export const RESIZE_TIMEOUT = 800;

export const NOTHING_FOUND = "Ничего не найдено";
export const ENTER_KEYWORD = "Нужно ввести ключевое слово";
export const DURATION_SHORT_FILM = 40;

export const SCREEN_WIDTH_1175 = 1175;
export const SCREEN_WIDTH_820 = 820;
export const SCREEN_WIDTH_500 = 500;

export const NUMBER_OF_FILMS_GIVEN_OUT_16 = 16;
export const NUMBER_OF_FILMS_GIVEN_OUT_12 = 12;
export const NUMBER_OF_FILMS_GIVEN_OUT_8 = 8;
export const NUMBER_OF_FILMS_GIVEN_OUT_5 = 5;

export const NUMBER_OF_FILMS_TO_BE_ADDED_4 = 4;
export const NUMBER_OF_FILMS_TO_BE_ADDED_3 = 3;
export const NUMBER_OF_FILMS_TO_BE_ADDED_2 = 2;

// текст ошибок
export const INTERNAL_SERVER_ERROR_500 = "На сервере произошла ошибка.";
export const BAD_REQUEST_400 = "При авторизации произошла ошибка. Переданный токен некорректен";
export const UNAUTHORIZED_401 = "Вы ввели не верный логин или пароль";
export const CONFLICT_409 = "Пользователь с таким email уже существует.";
export const PROFILE_UPDARED = "Профиль успешно обнавлен"
