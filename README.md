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

Статус SMS:
```js
sms.sms_status('SMS id', callback);
```

Стоимость SMS:
```js
sms.sms_cost({
  to: '79112223344',
  text: 'Текст SMS'
}, callback);
```

Баланс:
```js
sms.my_balance(function(e){
  console.log(e.balance);
})
```

Дневной лимит:

```js
sms.my_limit(function(e){
  console.log(e.current+' / '+e.total);
})
```

Отправители:
```js
sms.my_senders(function(e){
  console.log(e.senders);
})
```

Добавить номер в стоплист:
```js
sms.stoplist_add({
  phone:'79112223344',
  text:'Примечание'
}, callback)
```

Удалить номер из стоп-листа:
```js
sms.stoplist_del({
  phone:'79112223344',
}, callback)
```

Получить номера стоплиста:
```js
sms.stoplist_get(function(e){
  console.log(e.stoplist);
})
```

## Автор

[Максим Бородин](https://github.com/Borodin/), e-mail: [maxim@borodinart.ru](mailto:maxim@borodinart.ru)
