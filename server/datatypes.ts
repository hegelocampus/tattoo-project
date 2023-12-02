
export interface Flash {
  _id: ObjectId;
  name: string;
  imgUrl: string;
  description: string;
  size: string;
  price: string;
  isRepeatable: boolean;
  isAvailable: boolean;
}
