/* tslint:disable */
export interface Painting {
  author: string;
  description?: string;
  genres: Array<string>;
  height: number;
  id?: string;
  image: {name?: string, contentType?: string, data?: string};
  name: string;
  price: number;
  width: number;
}
