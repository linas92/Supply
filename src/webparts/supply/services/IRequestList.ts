export interface IRequestList {
  Id: string;
  Title: string;
  [index: string]: any;
}

export interface IRequestListCollection {
  value: IRequestList[];
}
