import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET /api/todos
app.get('/api/todos', async (_req: Request, res: Response) => {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'asc' } });
  res.json(todos);
});

// POST /api/todos
app.post('/api/todos', async (req: Request, res: Response) => {
  const { title } = req.body as { title: string };
  if (!title || !title.trim()) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }
  const todo = await prisma.todo.create({ data: { title: title.trim() } });
  res.status(201).json(todo);
});

// DELETE /api/todos/completed  (before /:id to avoid conflict)
app.delete('/api/todos/completed', async (_req: Request, res: Response) => {
  await prisma.todo.deleteMany({ where: { done: true } });
  res.status(204).send();
});

// PATCH /api/todos/toggle-all  (before /:id to avoid conflict)
app.patch('/api/todos/toggle-all', async (req: Request, res: Response) => {
  const { done } = req.body as { done: boolean };
  await prisma.todo.updateMany({ data: { done } });
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'asc' } });
  res.json(todos);
});

// PATCH /api/todos/:id
app.patch('/api/todos/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { title, done } = req.body as { title?: string; done?: boolean };
  const data: { title?: string; done?: boolean } = {};
  if (title !== undefined) data.title = title.trim();
  if (done !== undefined) data.done = done;
  const todo = await prisma.todo.update({ where: { id }, data });
  res.json(todo);
});

// DELETE /api/todos/:id
app.delete('/api/todos/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await prisma.todo.delete({ where: { id } });
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
