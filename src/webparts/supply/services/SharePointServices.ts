import { EnvironmentType } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

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

  private formatDateForFrontend(date: string | Date): string {
    const dateObject = typeof date === "string" ? new Date(date) : date;

    if (!isNaN(dateObject.getTime())) {
      return dateObject.toLocaleDateString();
    } else {
      return "Invalid Date";
    }
  }

  public get(relativeEndpointUrl: string): Promise<any> {
    return this.context.httpClient
      .get(
        `${this.context.pageContext.web.absoluteUrl}${relativeEndpointUrl}`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        if (!response.ok) {
          return Promise.reject("GET Request Failed");
        }

        return response.json().then((data) => {
          if (data.DueDate && typeof data.DueDate === "string") {
            data.DueDate = this.formatDateForFrontend(data.DueDate);
          }

          return data;
        });
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

const SharePointService = new SharePointServiceManager();
export default SharePointService;
