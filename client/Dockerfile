# Используем Node.js как базовый образ
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock (или package-lock.json) в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Указываем команду по умолчанию
CMD ["npm", "start"]
