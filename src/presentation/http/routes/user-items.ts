import { FastifyInstance } from 'fastify';
import { getUserItemsController } from '../controllers/get-user-items-controller';

export async function userItemsRoutes(app: FastifyInstance) {
    app.get('/users/:id/items', getUserItemsController);
}
