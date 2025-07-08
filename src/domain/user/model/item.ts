export interface Item {
    id: number;
    groupId: number;
    title: string;
    description: string;
}

export interface CreateItem {
    groupId: number;
    title: string;
    description: string;
}
