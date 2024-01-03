export interface IRequestFields {
  Id: string;
  Title: string;
  InternalName: string;
  TypeAsString: string;
  [index: string]: any;
}

export interface IRequestFieldCollection{
    value: IRequestFields[];
}