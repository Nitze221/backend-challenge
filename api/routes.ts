import { createRoute, z } from '@hono/zod-openapi'
import { 
  CreateSeashellSchema, 
  SeashellResponseSchema,
  IdParamSchema,
  ErrorSchema
} from "./seashell.schema.js";

export const commonErrors = {
  400: {
    content: { 'application/json': { schema: ErrorSchema } },
    description: 'Validation or logic error',
  },
  404: {
    content: { 'application/json': { schema: ErrorSchema } },
    description: 'Resource not found',
  },
  500: {
    content: { 'application/json': { schema: ErrorSchema } },
    description: 'Internal Server Error',
  },
};

// 1. LIST (GET /seashells) - Keep as is, usually doesn't 404
const getAll = createRoute({
  method: 'get',
  path: '/seashells',
  tags: ['Seashells'],
  summary: 'Show all seashells',
  responses: {
    200: {
      content: { 'application/json': { schema: z.array(SeashellResponseSchema) } },
      description: 'Retrieve all seashells',
    },
    ...commonErrors,
  },
});

// 2. GET ONE (GET /seashells/{id})
const getOne = createRoute({
  method: 'get',
  path: '/seashells/{id}',
  tags: ['Seashells'],
  summary: 'Show one seashell',
  request: { params: IdParamSchema },
  responses: {
    200: {
      content: { 'application/json': { schema: SeashellResponseSchema } },
      description: 'Retrieve a single seashell',
    },
    ...commonErrors,
  },
});

// 3. CREATE (POST /seashells)
const createSeashell = createRoute({
  method: 'post',
  path: '/seashells',
  tags: ['Seashells'],
  summary: 'Add a new seashell',
  request: {
    body: { content: { 'application/json': { schema: CreateSeashellSchema } } },
  },
  responses: {
    201: {
      content: { 'application/json': { schema: SeashellResponseSchema } },
      description: 'Seashell created successfully',
    },
    ...commonErrors,
  },
});

// 4. UPDATE (PUT /seashells/{id})
const updateSeashell = createRoute({
  method: 'put',
  path: '/seashells/{id}',
  tags: ['Seashells'],
  summary: 'Update a seashell',
  request: {
    params: IdParamSchema,
    body: { content: { 'application/json': { schema: CreateSeashellSchema.partial() } } },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: SeashellResponseSchema } },
      description: 'Seashell updated successfully',
    },
    ...commonErrors,
  },
});

// 5. DELETE (DELETE /seashells/{id})
const deleteSeashell = createRoute({
  method: 'delete',
  path: '/seashells/{id}',
  tags: ['Seashells'],
  summary: 'Delete a seashell',
  request: { params: IdParamSchema },
  responses: {
    200: {
      content: { 'application/json': { schema: z.object({ message: z.string() }) } },
      description: 'Seashell deleted successfully',
    },
    ...commonErrors,
  },
});

export {getAll,
    getOne,
    createSeashell,
    updateSeashell,
    deleteSeashell
}