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
  
  public addListItem = async (listId: string, newItem: any): Promise<number> => {
    try {
      const result = await this.sp.web.lists.getById(listId).items.add(newItem);
      console.log(`Item added with ID: ${result.data.Id}`);
      return result.data.Id;
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  };

  public updateListItem = async (
    listId: string,
    itemId: number,
    updatedValues: any
  ): Promise<void> => {
    await this.sp.web.lists
      .getById(listId)
      .items.getById(itemId)
      .update(updatedValues);
  };

  public async deleteListItem(listId: string, itemId: number): Promise<void> {
    try {
      await this.sp.web.lists.getById(listId).items.getById(itemId).delete();
      console.log(`Item with ID ${itemId} removed successfully.`);
    } catch (error) {
      console.error("Error removing item:", error);
      throw error;
    }
    return Promise.resolve();
  }
}
