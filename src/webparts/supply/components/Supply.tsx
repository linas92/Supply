import * as React from "react";
import styles from "./Supply.module.scss";
import type { ISupplyProps } from "../interfaces/ISupplyProps";
import { escape } from "@microsoft/sp-lodash-subset";
import SupplyServices from "../services/services";
import { ISupplyRequest } from "../interfaces/supply.interfaces";
import { DefaultButton } from "@fluentui/react";
import Counter from "./Counter";
import RemindersList from "./RemindersList";

const Supply: React.FC<ISupplyProps> = (props: ISupplyProps): JSX.Element => {
  const { userDisplayName, context } = props;
  const Services: SupplyServices = new SupplyServices(context);

  const _alertClicked = (): any => {
    alert("HA! Nothing happened!");
  };

  const [requestItems, setRequestItems] = React.useState<ISupplyRequest[]>([]);
  React.useEffect(() => {
    Services.getListItems().then((_response: ISupplyRequest[]) => {
      setRequestItems(_response);
      console.log(_response);
    });
  }, []);

  return (
    <section>
      {/* THIS IS A PLAYGROUND FOR NOW */}
      <DefaultButton
        text="New Request"
        onClick={_alertClicked}
        allowDisabledFocus
      />
      <br />
      <br />
      <div className={styles.welcome}>
        <div>
          <Counter label="stuff" buttonLabel="║╖║" />
        </div>
        <div>
          <Counter label="EX" initialCount={12} buttonLabel="◘" />
        </div>
        <div>
          <RemindersList listName={"Things to do:"} />
        </div>
        {/* THIS IS A PLAYGROUND FOR NOW */}

        <h2>Well done, {escape(userDisplayName)}!</h2>
        {requestItems.map((item) => {
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
*/
