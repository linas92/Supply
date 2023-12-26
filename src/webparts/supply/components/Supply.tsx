import * as React from "react";
import styles from "./Supply.module.scss";
import type { ISupplyProps } from "../interfaces/ISupplyProps";
import { escape } from "@microsoft/sp-lodash-subset";
import SupplyServices from "../services/services";
import { ISupplyRequest } from "../interfaces/supply.interfaces";
import { DefaultButton } from "@fluentui/react";

const Supply: React.FC<ISupplyProps> = (props: ISupplyProps): JSX.Element => {
  const { userDisplayName, context } = props;
  const Services: SupplyServices = new SupplyServices(context);


  function _alertClicked(): any { 
    alert("HA! Nothing happened!");
  }

  const [requestItems, setRequestItems] = React.useState<ISupplyRequest[]>([]);
  React.useEffect(() => {
    Services.getListItems().then((_response: ISupplyRequest[]) => {
      setRequestItems(_response);
      console.log(_response);
    });
  }, []);

  return (
    <section>
      <DefaultButton
        text="New Request"
        onClick={_alertClicked}
        allowDisabledFocus
      />
      <br />
      <br />
      <div className={styles.welcome}>
        <h2>Well done, {escape(userDisplayName)}!</h2>
        {requestItems.map((item, index) => {
          return (
            <div>
              {item.Id}|{item.Title}|{item.Status}|{item.RequestType}|
              {item.RequestArea}|{item.AssignedManager}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Supply;


/*
https://tgtj2.sharepoint.com/sites/SupplyDepartment/_api/

MAKE THE FUCNTION A CONSTANT AS A "CONST" and not a fucntion
*/