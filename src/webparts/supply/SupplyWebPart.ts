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
  percentage: number;
  showPercentageValue: boolean;
  headerAlignment: string;
}

export default class SupplyWebPart extends BaseClientSideWebPart<ISupplyWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<ISupplyProps> = React.createElement(
      Supply,
      {
        title: this.properties.title,
        percentage: this.properties.percentage,
        showPercentageValue: this.properties.showPercentageValue,
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
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

  // private _getEnvironmentMessage(): Promise<string> {
  //   if (!!this.context.sdks.microsoftTeams) {
  //     // running in Teams, office.com or Outlook
  //     return this.context.sdks.microsoftTeams.teamsJs.app
  //       .getContext()
  //       .then((context) => {
  //         let environmentMessage: string = "";
  //         switch (context.app.host.name) {
  //           case "Office": // running in Office
  //             environmentMessage = this.context.isServedFromLocalhost
  //               ? strings.AppLocalEnvironmentOffice
  //               : strings.AppOfficeEnvironment;
  //             break;
  //           case "Outlook": // running in Outlook
  //             environmentMessage = this.context.isServedFromLocalhost
  //               ? strings.AppLocalEnvironmentOutlook
  //               : strings.AppOutlookEnvironment;
  //             break;
  //           case "Teams": // running in Teams
  //           case "TeamsModern":
  //             environmentMessage = this.context.isServedFromLocalhost
  //               ? strings.AppLocalEnvironmentTeams
  //               : strings.AppTeamsTabEnvironment;
  //             break;
  //           default:
  //             environmentMessage = strings.UnknownEnvironment;
  //         }

  //         return environmentMessage;
  //       });
  //   }

  //   return Promise.resolve(
  //     this.context.isServedFromLocalhost
  //       ? strings.AppLocalEnvironmentSharePoint
  //       : strings.AppSharePointEnvironment
  //   );
  // }

  // protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
  //   if (!currentTheme) {
  //     return;
  //   }

  //   this._isDarkTheme = !!currentTheme.isInverted;
  //   const { semanticColors } = currentTheme;

  //   if (semanticColors) {
  //     this.domElement.style.setProperty(
  //       "--bodyText",
  //       semanticColors.bodyText || null
  //     );
  //     this.domElement.style.setProperty("--link", semanticColors.link || null);
  //     this.domElement.style.setProperty(
  //       "--linkHovered",
  //       semanticColors.linkHovered || null
  //     );
  //   }
  // }

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
                // PropertyPaneDropdown("headerAlignment", {
                //   label: "Header Alignment",
                //   options: [
                //     { key: "left", text: "Left" },
                //     { key: "center", text: "Center" },
                //     { key: "right", text: "Right" },
                // ],
                // }),
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
                // PropertyFieldColorPicker('fillColor', {
                //   label: 'Color',
                //   selectedColor: this.properties.fillColor,
                //   onPropertyChange: this.onPropertyPaneFieldChanged,
                //   properties: this.properties,
                //   disabled: false,
                //   debounce: 1000,
                //   isHidden: false,
                //   alphaSliderHidden: false,
                //   style: PropertyFieldColorPickerStyle.Full,
                //   iconName: 'Precipitation',
                //   key: 'colorFieldId'
                // }),
              ],
            },
          ],
        },
      ],
    };
  }
}
