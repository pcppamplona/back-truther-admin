export interface Group {
    id: number;
    groupName: string;
    idPai: number | null;
}

export interface CreateGroup {
    groupName: string;
    idPai?: number | null;
}
