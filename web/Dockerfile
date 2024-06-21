# Используем базовый образ с Node.js
FROM node:14

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости (включая devDependencies, так как live-server находится в devDependencies)
RUN npm install

# Копируем остальные файлы проекта в рабочую директорию
COPY . .

# Открываем порт, который использует live-server (по умолчанию 8080)
EXPOSE 8080

# Запускаем приложение
CMD ["npm", "start"]
