export interface ISupplyRequest {
  Id: number;
  Title: string;
  Status: string;
  AssignedManager: boolean;
  DueDate: Date;
  ExecutionDate: Date;
  RequestType: Boolean;
  RequestArea: string;
  Description: string;
}

export interface ISupplyRequestType {
  Id: number;
  Title: string;
  DisplayOrder: number;
  RequestArea: string;
  Tags: string;
}
