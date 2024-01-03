import * as React from "react";
import type { ISupplyProps } from "../interfaces/ISupplyProps";
import { escape } from "@microsoft/sp-lodash-subset";
import SupplyServices from "../services/services";
import { ISupplyRequest } from "../interfaces/supply.interfaces";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from "@fluentui/react";

const Supply: React.FC<ISupplyProps> = (props: ISupplyProps): JSX.Element => {
  const { userDisplayName, context } = props;
  const Services: SupplyServices = new SupplyServices(context);

  const [requestItems, setRequestItems] = React.useState<ISupplyRequest[]>([]);
  React.useEffect(() => {
    Services.getListItems().then((_response: ISupplyRequest[]) => {
      setRequestItems(_response);
      console.log(_response);
    });
  }, []);

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Title",
      fieldName: "Title",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Status",
      fieldName: "Status",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column3",
      name: "Assigned Manager",
      fieldName: "AssignedManager",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (item: ISupplyRequest) => {
        const managers = item.AssignedManager || [];
        if (managers.length > 0) {
          return managers[0].Title || "";
        } else {
          return "";
        }
      },
    },
    {
      key: "column4",
      name: "Due Date",
      fieldName: "DueDate",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (item: ISupplyRequest) => {
        const dueDate = item.DueDate || null;
        const formattedDueDate = dueDate ? dueDate.toLocaleDateString() : "";
        return formattedDueDate;
      },
    },
    {
      key: "column5",
      name: "Request Area",
      fieldName: "RequestArea",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column6",
      name: "Request Type",
      fieldName: "RequestType",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (item: ISupplyRequest) => {
        return item.RequestType ? item.RequestType.LookupValue : "";
      },
    },
    {
      key: "column7",
      name: "Description",
      fieldName: "Description",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
  ];

  return (
    <section>
      <h2>Well done, {escape(userDisplayName)}!</h2>
      <DetailsList
        items={requestItems}
        columns={columns}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.fixedColumns}
      />
    </section>
  );
};

export default Supply;
