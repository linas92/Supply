import * as React from "react";
import styles from "./Supply.module.scss";
import type { ISupplyProps } from "../interfaces/ISupplyProps";
import { escape } from "@microsoft/sp-lodash-subset";
import SupplyServices from "../services/services";
import { ISupplyRequest } from "../interfaces/supply.interfaces";

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

  return (
    <section>
      <div>{requestItems.length}</div>
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
