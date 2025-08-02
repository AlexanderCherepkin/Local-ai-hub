# PHP Proxy for AI Chat

## Установка

1. Загрузите содержимое папки `api` на ваш сервер в директорию `public_html/api/`.
2. Убедитесь, что файл `chat.php` доступен по адресу: `https://ваш-домен/api/chat.php`.
3. Проверьте, работает ли отправка POST-запроса, например через curl или из JS.

## Пример fetch в JS

```js
fetch('/api/chat.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Привет' })
})
.then(res => res.json())
.then(data => console.log(data));
```

## Настройки

Если вы используете сторонний прокси, измените строку `$proxy_url` в `chat.php`.
