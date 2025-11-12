import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '@/presentation/http/middlewares/verify-jwt'
import { getRolePermissionController } from '../../controllers/permissions/role-permission/get-role-permission-controller'
import { createRolePermissionController } from '../../controllers/permissions/role-permission/create-role-permission-controller'
import { deleteRolePermissionController } from '../../controllers/permissions/role-permission/delete-role-permission-controller'
import { getUserPermissionsController } from '../../controllers/permissions/user-permission/get-user-permissions-controller'
import { createUserPermissionController } from '../../controllers/permissions/user-permission/create-user-permission-controller'
import { deleteUserPermissionController } from '../../controllers/permissions/user-permission/delete-user-permission-controller'
import { getPermissionController } from '../../controllers/permissions/get-permission-controller'

export async function permissionsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/permissions',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Permissions'],
        summary: 'Get all permissions',
      },
    },
    getPermissionController
  )

  ////////////////////////////// ROLE PERMISSIONS
  app.withTypeProvider<ZodTypeProvider>().get(
    '/permissions/roles/:role_id',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Permissions'],
        summary: 'Get all permissions of a role',
      },
    },
    getRolePermissionController
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

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/permissions/roles/:role_id/:permission_id',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Permissions'],
        summary: 'Remove permission from role',
      },
    },
    deleteRolePermissionController
  )



  ////////////////////////////// USERS PERMISSIONS
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

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/permissions/users/:user_id/:permission_id',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Permissions'],
        summary: 'Remove permission from user',
      },
    },
    deleteUserPermissionController
  )

}
