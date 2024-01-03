import { EnvironmentType } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";

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
}

const SharePointService = new SharePointServiceManager();
export default SharePointService;
