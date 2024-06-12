# Используем Node.js как базовый образ
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock (или package-lock.json) в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы в контейнер
COPY . .

# Сборка TypeScript кода
RUN npm run build

# Запуск миграций и сидов
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all

# Открываем порт приложения
EXPOSE 3000

# Указываем команду по умолчанию
CMD ["npm", "run", "start:prod"]
