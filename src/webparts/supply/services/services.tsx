import { SPFI } from "@pnp/sp";
import { getSP } from "../../pnpjsConfig";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  ISupplyRequest /*ISupplyRequestTypes*/,
} from "../interfaces/supply.interfaces";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

//chatGPT offered solution:
//import { Item } from "@pnp/sp/items";

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
      console.log("Error Initiating pnp spfie!");
    }
  }
  public getListItems = async (): Promise<ISupplyRequest[]> => {
    const items: ISupplyRequest[] = await this.sp.web.lists
      .getByTitle(this.requests)
      .items();
    return items;
  };
  //MY SPAGHETTI
  //   public getListItems = async(): Promise<ISupplyRequestType[]> =>{
  //     const items: ISupplyRequestType[] = await this.sp.wb.lists
  //     .getByTitle(this.requests)
  //     .items();
  //   return items;
  //   }
  // }

  //chatGPT offered solution:
  // public getListItems = async (): Promise<ISupplyRequest[]> => {
  //   const items: Item[] = await this.sp.web.lists.getByTitle(this.requests).items.get();
  //   const mappedItems: ISupplyRequest[] = items.map(item => ({
  //     Id: item.Id,
  //     Title: item.Title,
  //   }));
  //   return mappedItems;
  // };
  // }
}
