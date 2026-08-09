import { todoService } from '../services/todoService.js';

const PRIORITIES = ['low', 'medium', 'high'];
const DUE_DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

// Validates enrichment fields when present.
// Returns an error message, or null when the body is valid.
function validateEnrichmentFields(body) {
  if (body.priority !== undefined && !PRIORITIES.includes(body.priority)) {
    return `Priority must be one of: ${PRIORITIES.join(', ')}`;
  }
  if (body.dueDate !== undefined && body.dueDate !== null &&
      !(typeof body.dueDate === 'string' && DUE_DATE_FORMAT.test(body.dueDate))) {
    return 'dueDate must be a YYYY-MM-DD string or null';
  }
  if (body.tags !== undefined) {
    if (!Array.isArray(body.tags) ||
        body.tags.some(tag => typeof tag !== 'string' || !tag.trim())) {
      return 'tags must be an array of non-empty strings';
    }
    body.tags = [...new Set(body.tags.map(tag => tag.trim()))];
  }
  return null;
}

export default async function todosRoutes(fastify, options) {

  // GET /api/todos - Get all todos
  fastify.get('/', async (request, reply) => {
    return todoService.getAll();
  });

  // GET /api/todos/stats - Get aggregate task counts
  fastify.get('/stats', async (request, reply) => {
    return todoService.getStats();
  });

  // GET /api/todos/:id - Get single todo
  fastify.get('/:id', async (request, reply) => {
    const todo = todoService.getById(request.params.id);
    if (!todo) {
      return reply.status(404).send({ error: 'Todo not found' });
    }
    return todo;
  });

  // POST /api/todos - Create new todo
  fastify.post('/', async (request, reply) => {
    const { title, status, priority, dueDate } = request.body;
    if (!title || !title.trim()) {
      return reply.status(400).send({ error: 'Title is required' });
    }
    const validationError = validateEnrichmentFields(request.body);
    if (validationError) {
      return reply.status(400).send({ error: validationError });
    }
    let todo;
    try {
      todo = todoService.create({
        title: title.trim(),
        status,
        priority,
        dueDate,
        tags: request.body.tags
      });
    } catch (error) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(201).send(todo);
  });

  // PUT /api/todos/:id - Update todo
  fastify.put('/:id', async (request, reply) => {
    if (!todoService.getById(request.params.id)) {
      return reply.status(404).send({ error: 'Todo not found' });
    }
    const validationError = validateEnrichmentFields(request.body);
    if (validationError) {
      return reply.status(400).send({ error: validationError });
    }
    let todo;
    try {
      todo = todoService.update(request.params.id, request.body);
    } catch (error) {
      return reply.status(400).send({ error: error.message });
    }
    if (!todo) {
      return reply.status(404).send({ error: 'Todo not found' });
    }
    return todo;
  });

  // DELETE /api/todos/:id - Delete todo
  fastify.delete('/:id', async (request, reply) => {
    const deleted = todoService.delete(request.params.id);
    if (!deleted) {
      return reply.status(404).send({ error: 'Todo not found' });
    }
    return { success: true };
  });
}
