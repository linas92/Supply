import * as React from "react";
import styles from "./Supply.module.scss";
import type { ISupplyProps } from "./ISupplyProps";
import { escape } from "@microsoft/sp-lodash-subset";
import SupplyServices from "../services/services";
import { ISupplyRequest } from "../interfaces/supply.interfaces";

const Supply: React.FC<ISupplyProps> = (props: ISupplyProps): JSX.Element => {
  const {
    description,
    environmentMessage,
    hasTeamsContext,
    userDisplayName,
    context,
  } = props;
  const Services: SupplyServices = new SupplyServices(context);

  const [requestItems, setRequestItems] = React.useState<ISupplyRequest[]>([]);
  React.useEffect(() => {
    Services.getListItems().then((_response: ISupplyRequest[]) => {
      setRequestItems(_response);
      console.log(_response);
    });
  }, []);

  return (
    <section
      className={`${styles.supply} ${hasTeamsContext ? styles.teams : ""}`}
    >
      <div>{requestItems.length}</div>
      <div className={styles.welcome}>
        <h2>Well done, {escape(userDisplayName)}!</h2>
        <div>{environmentMessage}</div>
        <div>
          Web part property value: <strong>{escape(description)}</strong>
        </div>
      </div>
    </section>
  );
};

export default Supply;
