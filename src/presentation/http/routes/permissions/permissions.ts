import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '@/presentation/http/middlewares/verify-jwt'
import { getRolePermissionsController } from '../../controllers/permissions/get-role-permissions-controller'
import { createRolePermissionController } from '../../controllers/permissions/create-role-permission-controller'
import { getUserPermissionsController } from '../../controllers/permissions/get-user-permissions-controller'
import { createUserPermissionController } from '../../controllers/permissions/create-user-permission-controller'

export async function permissionsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/permissions/roles/:role_id',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Permissions'],
        summary: 'Get all permissions of a role',
      },
    },
    getRolePermissionsController
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/permissions/roles',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Permissions'],
        summary: 'Assign permission to role',
      },
    },
    createRolePermissionController
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/permissions/users/:user_id',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Permissions'],
        summary: 'Get all permissions of a user',
      },
    },
    getUserPermissionsController
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/permissions/users',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Permissions'],
        summary: 'Assign permission to user',
      },
    },
    createUserPermissionController
  )
}
