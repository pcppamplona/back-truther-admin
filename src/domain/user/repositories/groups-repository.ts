import { Group } from "../model/group"

export interface GroupsRepository {
  getGroupById(id: number): Promise<Group | null>
  getChildrenGroups(groupId: number): Promise<Group[]>
  getAllDescendants(groupId: number): Promise<number[]> 
}
