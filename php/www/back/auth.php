<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="auth.css">
    <link rel="preload" href="/fonts/SourceSansPro-SemiBold.ttf" as="font">
    <title>Authorization</title>
</head>
<body>
    <div class="l-wrapper">
        <div class="text-section">Вход</div>
        <form class="l-form" id="loginForm">
            <span>Login</span>
            <input id="login" name="login" type="text" placeholder="Login">
            <span>Пароль</span>
            <input id="password" name="password" type="text" placeholder="Пароль">
            <div class="l-check"></div>
            <input class="submit" type="submit" value="Войти">
        </form>

        <script>
            document.getElementById('loginForm').addEventListener('submit', function(event) {
                event.preventDefault(); // Предотвращаем отправку формы по умолчанию

                // Получаем значения логина и пароля из формы
                let login = document.getElementById('login').value;
                let password = document.getElementById('password').value;

                // Отправляем данные на сервер для аутентификации
                fetch('http://localhost:81/credits.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'login=' + encodeURIComponent(login) + '&password=' + encodeURIComponent(password)
                })
                    .then(response => {
                        if (response.ok) {
                            return response.text();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then(data => {
                        if (data.trim() === 'success') {
                            // Если аутентификация успешна, перенаправляем на index.html
                            window.location.href = 'index.php';
                        } else {
                            // Выводим сообщение об ошибке
                            document.getElementById('message').textContent = 'Неверное имя пользователя или пароль';
                        }
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
            });
        </script>

        <div class="l-links"></div>
        <div class="l-line"><a href="/registration.html">У вас нет аккаунта? Регестрируйтесь</a></div>
        <div class="l-reg-link"></div>
    </div>
</body>
</html>