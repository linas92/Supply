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
    Id: number;
    Title: string;
    Email: string;
  };
  SelectedManager?: any;
  Tags: string[];
  Status: string;
  Created: string;
}

export interface ISupplyRequestType {
  Id: number;
  Title: string;
  DisplayOrder: number;
  RequestArea: string;
  Tags: string;
}