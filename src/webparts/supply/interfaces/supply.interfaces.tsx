export interface ISupplyRequest {
  Id: number;
  Title: string;
  Status: string;
  AssignedManager: Array<{ Id: number; Title: string; Email: string }>;
  DueDate: Date;
  ExecutionDate: Date;
  RequestType: { LookupId: number; LookupValue: string };
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
