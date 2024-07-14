import { ObjectId } from 'bson';
export interface Post {
    _id: string | undefined;
    title: string;
    content: any;
    author: string;
}