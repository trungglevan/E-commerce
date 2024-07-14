import { ObjectId } from 'bson';
export interface User {
    _id: string | undefined;
    name: string;
    email: string
    password: string
    author: string | undefined;
}