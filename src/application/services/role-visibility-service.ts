/**
 * Service that determines which roles are visible to a user based on their role.
 * Returns:
 *  - `null`: can see all (Admin)
 *  - `[]`: only own tickets (N1)
 *  - `[ids...]`: list of visible roles
 */
export class RoleVisibilityService {
  async resolveVisibleRoleIds(userRoleId: number): Promise<number[] | null> {
    switch (userRoleId) {
      case 1: // N1
        return [] // only own tickets

      case 2: // N2
        return [1, 2] // sees N1, N2

      case 3: // N3
        return [1, 2, 3] // sees N1, N2, N3

      case 4: // Produto
        return [4] // only Produto

      case 5: // MKT
        return [5] // only MKT

      case 6: // Admin
        return null // can see all

      default:
        return [userRoleId] // fallback safety
    }
  }
}

export default RoleVisibilityService
