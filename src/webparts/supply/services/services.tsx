import { SPFI } from "@pnp/sp";
import { getSP } from "../../pnpjsConfig";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISupplyRequest } from "../interfaces/supply.interfaces";

//chatGPT offered solution:
//import { Item } from "@pnp/sp/items";

export default class SupplyServices {
  private sp: SPFI;
  private requests: string = "Requests";

  constructor(context: WebPartContext) {
    this.sp = getSP(context);
  }
  public getListItems = async (): Promise<ISupplyRequest[]> => {
    const items: ISupplyRequest[] = await this.sp.web.lists
      .getByTitle(this.requests)
      .items();
    return items;
  };
}

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
