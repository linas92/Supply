export interface IRequestListItem {
  Id: number;
  [index: string]: any;
}

export interface IRequestListItemCollection {
  value: IRequestListItem[];
}
