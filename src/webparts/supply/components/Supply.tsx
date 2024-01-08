import * as React from "react";
import type { ISupplyProps } from "../interfaces/ISupplyProps";
import SupplyServices from "../services/services";
import { ISupplyRequest } from "../interfaces/supply.interfaces";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Modal,
  SelectionMode,
} from "@fluentui/react";
import { DefaultButton } from "@fluentui/react";
import { DynamicForm } from "@pnp/spfx-controls-react/lib/DynamicForm";

const Supply: React.FC<ISupplyProps> = (props: ISupplyProps): JSX.Element => {
  const { context } = props;

  const Services: SupplyServices = new SupplyServices(context);

  const [showForm, setShowForm] = React.useState<boolean>(false);

  const [showAllItems, setShowAllItems] = React.useState<boolean>(false);

  const [displayedItemsCount, setDisplayedItemsCount] =
    React.useState<number>(5);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const toggleShowAllItems = () => {
    setShowAllItems((prevShowAllItems) => !prevShowAllItems);
    setDisplayedItemsCount((prevCount) => (prevCount === 5 ? 12 : 5));
  };

  const formatDateForFrontend = (date: string | Date): string => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleDateString();
    } else {
      return "Invalid Date";
    }
  };

  const [requestItems, setRequestItems] = React.useState<ISupplyRequest[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Services.getListItems();
        setRequestItems(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //#region const columns: IColumn[] = [
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
      name: "Due Date",
      fieldName: "DueDate",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (item: ISupplyRequest) => {
        const formattedDueDate = formatDateForFrontend(item.DueDate);
        return formattedDueDate;
      },
    },
    {
      key: "column4",
      name: "Request Area",
      fieldName: "RequestArea",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column5",
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
      key: "column6",
      name: "Description",
      fieldName: "Description",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
  ];
  //#endregion

  return (
    <section>
      <DefaultButton text="Create New Request" onClick={openForm} />
      {showForm && (
        <Modal isOpen={showForm} onDismiss={closeForm} isBlocking={false}>
          <DynamicForm
            context={props.context}
            listId={"c8dd8f7c-f6a6-4b0d-a550-2389b114894f"}
            onCancelled={() => {
              console.log("Cancelled");
              setShowForm(false);
            }}
            onSuccess={() => {
              console.log("Success");
              setShowForm(false);
            }}
          />
        </Modal>
      )}

      <DetailsList
        items={
          showAllItems
            ? requestItems
            : requestItems.slice(0, displayedItemsCount)
        }
        columns={columns}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        key={showAllItems.toString()}
      />

      {requestItems.length > displayedItemsCount && (
        <div>
          <DefaultButton
            text={showAllItems ? "Show Less" : "Show More"}
            onClick={toggleShowAllItems}
          />
        </div>
      )}
    </section>
  );
};

export default Supply;
