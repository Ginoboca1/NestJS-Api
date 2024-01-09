import { ObjectId } from 'mongoose';

export interface IPost {
  title?: string;
  authors?: string[];
  content?: string;
  categories?: string[];
}

export type PostWithId = IPost & { _id: string | ObjectId };
