import { makeGetTicketsPaginatedUseCase } from "@/application/factories/tickets/make-get-tickets-paginated";
import { RoleVisibilityService } from "@/application/services/role-visibility-service";
import { FastifyRequest, FastifyReply } from "fastify";

export async function GetTicketsPaginatedController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const {
    page = "1",
    limit = "100",
    search,
    sortBy,
    sortOrder,
    assignedRole: assignedRoleQuery,
    status
  } = req.query as any;

  const userId = req.user.sub;
  const userRoleId = req.user.role;

  const visibilityService = new RoleVisibilityService();
  const visibleRoles = await visibilityService.resolveVisibleRoleIds(userRoleId);
  const resolvedAssignedRole = visibleRoles === null
    ? null
    : (visibleRoles.length > 0 ? visibleRoles : [userRoleId]);

  const useCase = makeGetTicketsPaginatedUseCase(req.pgClient);

  const result = await useCase.execute({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    search,
    sortBy,
    sortOrder,
    onlyAssigned: false,
    assignedRole: assignedRoleQuery,
    // 👇 usa o campo certo conforme a quantidade de roles
    ...(Array.isArray(resolvedAssignedRole) && resolvedAssignedRole.length > 1
      ? { assignedRoles: resolvedAssignedRole }
      : { assignedRole: resolvedAssignedRole ? resolvedAssignedRole[0].toString() : undefined }),
    status,
    userId,
  });

  return reply.status(200).send(result);
}
