# ✅ ToDo App

[![Maintainability](https://api.codeclimate.com/v1/badges/REPLACE_WITH_YOUR_TOKEN/maintainability)](https://codeclimate.com/github/REPLACE_WITH_YOUR_USERNAME/REPLACE_WITH_YOUR_REPO/maintainability)

Полнофункциональное веб-приложение для управления списком задач, реализованное по спецификации [TodoMVC](https://todomvc.com). Построено по архитектуре клиент-сервер с хранением данных в PostgreSQL.

---

## 🚀 Демонстрация

> Ссылка на деплой: [(https://project-a7fd6e1f-2feb-4733-9da.lm.r.appspot.com/)]

![demo](https://project-a7fd6e1f-2feb-4733-9da.lm.r.appspot.com/)

---

## 🛠 Стек технологий

### Frontend

- [React 19](https://react.dev/) — UI-библиотека
- [TypeScript](https://www.typescriptlang.org/) — типизация
- [Vite 8](https://vitejs.dev/) — сборщик и dev-сервер

### Backend

- [Node.js](https://nodejs.org/) — среда выполнения
- [Express 4](https://expressjs.com/) — веб-фреймворк
- [TypeScript](https://www.typescriptlang.org/) — типизация
- [ts-node-dev](https://github.com/wclr/ts-node-dev) — hot-reload в разработке

### База данных

- [PostgreSQL](https://www.postgresql.org/) — реляционная СУБД
- [Prisma 7](https://www.prisma.io/) — ORM

---

## ⚙️ Функциональность

- ➕ Создание задачи (поле ввода + Enter)
- ✅ Отметка задачи как выполненной / снятие отметки
- ✏️ Редактирование текста задачи (двойной клик → Enter / Escape)
- 🗑️ Удаление задачи (кнопка ×)
- 🔁 Массовое переключение всех задач (Toggle All)
- 🧹 Удаление всех выполненных задач (Clear Completed)
- 🔍 Фильтрация: **All** / **Active** / **Completed**
- 🔢 Счётчик оставшихся задач

---

## 📦 Установка и запуск

### Требования

- Node.js >= 18
- PostgreSQL >= 14
- npm >= 9

### 1. Клонировать репозиторий

```bash
git clone https://github.com/REPLACE_WITH_YOUR_USERNAME/REPLACE_WITH_YOUR_REPO.git
cd REPLACE_WITH_YOUR_REPO
```

### 2. Установить зависимости фронтенда

```bash
npm install
```

### 3. Установить зависимости бэкенда

```bash
cd server
npm install
```

### 4. Настроить переменные окружения

Создай файл `server/.env` (или отредактируй существующий):

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/todoapp"
PORT=3001
```

> Замени `YOUR_PASSWORD` на пароль своего PostgreSQL.  
> База данных `todoapp` должна существовать:
>
> ```sql
> CREATE DATABASE todoapp;
> ```

### 5. Применить схему базы данных

```bash
# из папки server/
npx prisma db push
```

### 6. Запустить проект

```bash
# из корневой папки — запускает фронтенд и бэкенд одновременно
cd ..
npm start
```

| Сервис     | URL                             |
| ---------- | ------------------------------- |
| Фронтенд   | http://localhost:5173           |
| Бэкенд API | http://localhost:3001/api/todos |

---

## 🗂 Структура проекта

```
├── src/                        # React-приложение
│   ├── components/
│   │   ├── TodoApp.tsx         # Главный компонент (state + handlers)
│   │   ├── TodoHeader.tsx      # Поле ввода новой задачи
│   │   ├── TodoMain.tsx        # Список задач + toggle-all
│   │   ├── TodoItem.tsx        # Элемент списка (toggle, edit, delete)
│   │   └── TodoFooter.tsx      # Фильтры, счётчик, clear completed
│   ├── api.ts                  # Все fetch-запросы к API
│   └── types.ts                # Интерфейс Todo, тип Filter
├── server/
│   ├── src/
│   │   └── index.ts            # Express-сервер, все эндпоинты
│   ├── prisma/
│   │   └── schema.prisma       # Схема БД (модель Todo)
│   ├── prisma.config.ts        # Конфигурация Prisma 7
│   ├── .env                    # Переменные окружения (не коммитить!)
│   └── package.json
├── vite.config.ts              # Vite + прокси /api → :3001
└── package.json
```

---

## 🔌 API

| Метод    | URL                     | Описание                            |
| -------- | ----------------------- | ----------------------------------- |
| `GET`    | `/api/todos`            | Получить все задачи                 |
| `POST`   | `/api/todos`            | Создать задачу `{ title }`          |
| `PATCH`  | `/api/todos/toggle-all` | Переключить все `{ done }`          |
| `PATCH`  | `/api/todos/:id`        | Обновить задачу `{ title?, done? }` |
| `DELETE` | `/api/todos/completed`  | Удалить все выполненные             |
| `DELETE` | `/api/todos/:id`        | Удалить задачу по id                |

---

## 📝 Лицензия

MIT
