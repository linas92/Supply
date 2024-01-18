import * as React from "react";
import "./Supply.module.scss";
import { ISupplyProps } from "../interfaces/ISupplyProps";
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
import { useEffect, useState } from "react";
import styles from "./Supply.module.scss";

const Supply: React.FC<ISupplyProps> = (props) => {
  const { context } = props;
  const Services = new SupplyServices(context);

  const [showForm, setShowForm] = useState<boolean>(false);
  const [showAllItems] = useState<boolean>(false);
  const [displayedItemsCount, setDisplayedItemsCount] = useState<number>(5);
  const [requestItems, setRequestItems] = useState<ISupplyRequest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Services.getListItems();

        const sortedItems = response.sort((a, b) => {
          const dateA = new Date(a.Created).getTime();
          const dateB = new Date(b.Created).getTime();
          return dateB - dateA;
        });

        setRequestItems(sortedItems);
        console.log(sortedItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const refreshList = async () => {
    console.log("Refresh button clicked");
    try {
      const response = await Services.getListItems();
      const sortedItems = response.sort((a, b) => {
        const dateA = new Date(a.Created).getTime();
        const dateB = new Date(b.Created).getTime();
        return dateB - dateA;
      });

      setRequestItems(sortedItems);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };
  

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const showMoreItems = () => {
    if (displayedItemsCount + 5 <= requestItems.length) {
      setDisplayedItemsCount((prevCount) => prevCount + 5);
    }
  };

  const showLessItems = () => {
    setDisplayedItemsCount((prevCount) => Math.max(prevCount - 5, 5));
  };

  const formatDateForFrontend = (date: string | Date): string => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleDateString();
    } else {
      return "Invalid Date";
    }
  };
//#region Ugly...
  const getStatusStyle = (status: string): React.CSSProperties => {
    const commonStyle: React.CSSProperties = {
      padding: "4px 8px",
      borderRadius: "4px",
      fontWeight: "bold",
    };

    const statusColors: {
      [key: string]: { color: string; backgroundColor: string };
    } = {
      new: { color: "white", backgroundColor: "#3498db" },
      "in progress": { color: "white", backgroundColor: "#997c09" },
      approved: { color: "white", backgroundColor: "#19bf5f" },
      rejected: { color: "white", backgroundColor: "#da3d2c" },
    };

    return { ...commonStyle, ...(statusColors[status.toLowerCase()] || {}) };
  };
//#endregion 
      const columns: IColumn[] = [
{
      key: "columnEdit",
      name: "",
      fieldName: "Edit",
      minWidth: 30,
      onRender: (item) => {
        function openFormForEdit(item: any): void {
          throw new Error("Function not implemented.");
        }

        function removeRequest(Id: any): void {
          throw new Error("Function not implemented.");
        }

        return (
          <React.Fragment>
            <DefaultButton
              className={styles.editButton}
              onClick={() => openFormForEdit(item)}
            >
              Edit
            </DefaultButton>

            <DefaultButton
              text="Delete"
              onClick={() => removeRequest(item.Id)}
              className={styles.deleteButton}
            />
          </React.Fragment>
        );
      },
    },
    {
      key: "columnTitle",
      name: "Title",
      fieldName: "Title",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: "columnStatus",
      name: "Status",
      fieldName: "Status",
      minWidth: 80,
      maxWidth: 80,
      isResizable: true,
      onRender: (item: ISupplyRequest) => {
        const status = item.Status;
        const statusStyle = getStatusStyle(status);

        return <div style={statusStyle}>{status}</div>;
      },
    },
    {
      key: "columnDueDate",
      name: "Due Date",
      fieldName: "DueDate",
      minWidth: 60,
      maxWidth: 60,
      isResizable: true,
      onRender: (item: ISupplyRequest) => {
        const formattedDueDate = formatDateForFrontend(item.DueDate);
        return formattedDueDate;
      },
    },
    {
      key: "columnRequestArea",
      name: "Request Area",
      fieldName: "RequestArea",
      minWidth: 110,
      maxWidth: 120,
      isResizable: true,
    },
    {
      key: "columnRequestType",
      name: "Request Type",
      fieldName: "RequestType",
      minWidth: 120,
      maxWidth: 120,
      isResizable: true,
      onRender: (item: ISupplyRequest) => {
        return item.RequestType ? item.RequestType.LookupValue : "";
      },
    },
    {
      key: "columnDescription",
      name: "Description",
      fieldName: "Description",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
  ];

  return (
    <section>
      <DefaultButton text="Create New Request" onClick={openForm} />

      <DefaultButton
        text="Refresh List"
        onClick={refreshList}
        className={styles.refreshButton}
      />

      {showForm && (
        <Modal
          isOpen={showForm}
          onDismiss={closeForm}
          isBlocking={false}
          containerClassName={styles.customModalContainer}
        >
          <div className={styles.modalHeader}>New Request Creation:</div>
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
        items={requestItems.slice(0, displayedItemsCount)}
        columns={columns}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        key={displayedItemsCount.toString()}
      />

      <div>
        <DefaultButton
          text="Show More"
          onClick={showMoreItems}
          disabled={showAllItems}
        />
        <DefaultButton
          text="Show Fewer"
          onClick={showLessItems}
          disabled={displayedItemsCount <= 5}
        />
      </div>
    </section>
  );
};

export default Supply;