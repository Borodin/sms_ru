sms_ru
======

Nodejs модуль для работы с API сервиса [sms.ru](http://sms.ru)


## Использование

Подключение:
```js
var SMSru = require('sms_ru');
```

Авторизация (с помощью api_id):
```js
var sms = new SMSru(api_id);
```

Авторизация (с помощью логина и пароля)):
```js
var sms = new SMSru(login, password);
```

Отправка SMS:
