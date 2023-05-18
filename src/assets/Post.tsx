export type Post = {
    userId?: number;
    id?: number;
    title?: string;
    body?: string;
};

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export type SUBDEP = {
    name?: string;
    parent?: string;
    subid?: string;
};

export interface ISUBDEP {
    name: string;
    parent: string;
    subid: string;
}

export type JSONdata = {
    id?: string;
    department?: string;
    sub_departments?: ISUBDEP[];
};

export interface IJSONdata {
    id: string;
    department: string;
    sub_departments: ISUBDEP[];
}
