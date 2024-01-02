import { EnvironmentType } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";
import { IRequestListCollection } from "./IRequestList";
import { RequestListCollection } from "../components/data/RequestListCollection";
import { RequestListItemCollection } from "../components/data/RequestListItemCollection";
import { IRequestFieldCollection } from "./IRequestListField";
import { IRequestListItemCollection } from "./IRequestListItem";
import { RequestListFieldCollection } from "../components/data/RequestListFieldCollection";

export class SharePointServiceManager {
  public context: WebPartContext;
  public environmentType: EnvironmentType;

  public setup(
    context: WebPartContext,
    environmentType: EnvironmentType
  ): void {
    this.context = context;
    this.environmentType = environmentType;
  }

  public get(relativeEndpointUrl: string): Promise<any> {
    return this.context.httpClient
      .get(
        `${this.context.pageContext.web.absoluteUrl}
    ${relativeEndpointUrl}`,
        SPHttpClient.configurations.v1
      )
      .then((response) => {
        if (!response.ok) return Promise.reject("GET Request Failed");
        return response.json();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public getLists(
    showHiddenLists: boolean = false
  ): Promise<IRequestListCollection> {
    if (this.environmentType == this.environmentType) {
      return new Promise((resolve) => resolve(RequestListCollection));
    }
    return this.get(
      `/_api/lists${!showHiddenLists ? "?$filter=Hidden eq false" : ""}`
    );
  }

  public getListItems(
    listId: string,
    selectedFields?: string[]
  ): Promise<IRequestListItemCollection> {
    if (this.environmentType) {
      return new Promise((resolve) => resolve(RequestListItemCollection));
    }
    return this.get(
      `/api/lists/getbyid('${listId}')/items${
        selectedFields ? `?$selected=${selectedFields.join(",")}` : ""
      }`
    );
  }
  public getListFields(
    listId: string,
    showHiddenFields: boolean = false
  ): Promise<IRequestFieldCollection> {
    if (this.environmentType == this.environmentType) {
      return new Promise((resolve) => resolve(RequestListFieldCollection));
    }
    return this.get(
      `/_api/lists/getbyid('${listId}')/fields${
        !showHiddenFields ? "?$filter=Hidden eq false" : ""
      }`
    );
  }
}

const SharePointService = new SharePointServiceManager();
export default SharePointService;
