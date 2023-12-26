import { SPFI } from "@pnp/sp";
import { getSP } from "../../pnpjsConfig";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  ISupplyRequest,
  ISupplyRequestType,
} from "../interfaces/supply.interfaces";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

export default class SupplyServices {
  private sp: SPFI;
  private requests: string = "Requests";

  constructor(context: WebPartContext) {
    console.log("HERE !", context);

    const mySP = getSP(context);
    if (mySP) {
      this.sp = getSP(context) as SPFI;
    }
    if (!this.sp) {
      console.log("Error Initiating pnp spfi!");
    }
  }
  public getListItems = async (): Promise<ISupplyRequest[]> => {
    const items: ISupplyRequest[] = await this.sp.web.lists
      .getByTitle(this.requests)
      .items();
    return items;
  };
  public getTypeListItems = async (): Promise<ISupplyRequestType[]> => {
    const items: ISupplyRequestType[] = await this.sp.web.lists
      .getByTitle(this.requests)
      .items();
    return items;
  };
}
