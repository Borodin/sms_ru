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

Авторизация (с помощью логина и пароля):
```js
var sms = new SMSru(login, password);
```

Отправка SMS:
```js
sms.sms_send({
  to: '79112223344',
  text: 'Текст SMS'
}, function(e){
  console.log(e.description);
});


sms.sms_send({
  multi: [
    ['79112223344', 'Текст СМС'],
    ['79115556677', 'Текст СМС'],
    ['79115552255', 'Текст СМС']
  ], function(e){
    console.log(e.description);
});
```
