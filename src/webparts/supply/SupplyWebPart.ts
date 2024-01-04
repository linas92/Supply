import * as React from "react";
import * as ReactDom from "react-dom";
import { Environment, Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneHorizontalRule,
  PropertyPaneSlider,
  PropertyPaneLabel,
  PropertyPaneCheckbox,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import Supply from "./components/Supply";
import { ISupplyProps } from "./interfaces/ISupplyProps";
import SharePointService from "./services/SharePointServices";

export interface ISupplyWebPartProps {
  title: string;
  description: string;
}

export default class SupplyWebPart extends BaseClientSideWebPart<ISupplyWebPartProps> {
  private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<ISupplyProps> = React.createElement(
      Supply,
      {
        title: this.properties.title,
        description: this.properties.description,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        webURL: this.context.pageContext.web.absoluteUrl,
        context: this.context,
      }
    );
    console.log("WP CONTEXT", this.context);
    ReactDom.render(element, this.domElement);
  }

  public onInit(): Promise<void> {
    return super.onInit().then(() => {
      SharePointService.setup(this.context, Environment.type);
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Dude Settings",
          },
          groups: [
            {
              groupName: "Header Settings",
              groupFields: [
                PropertyPaneTextField("title", {
                  label: "Title",
                }),
                PropertyPaneTextField("description", {
                  label: "Description",
                }),
              ],
            },
            {
              groupName: "Chart Settings",
              groupFields: [
                PropertyPaneHorizontalRule(),
                PropertyPaneSlider("percentage", {
                  min: 0,
                  max: 100,
                  step: 1,
                }),
                PropertyPaneLabel("", {
                  text: "Enter a value between 0 and 100",
                }),
                PropertyPaneCheckbox("showPercentageValue", {
                  text: "Show Percentage",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
