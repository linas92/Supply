export interface ISupplyRequest {
  Id: number;
  Title: string;
  Description: string;
  DueDate: Date;
  ExecutionDate: Date;
  RequestType: {
    LookupId: number;
    LookupValue: string;
  };
  RequestArea: string;
  AssignedManager: {
    LookupId: number;
    LookupValue: string;
  };
  Tags: string[];
  Status: string;
}

export interface ISupplyRequestType {
  Id: number;
  Title: string;
  DisplayOrder: number;
  RequestArea: string;
  Tags: string;
}
