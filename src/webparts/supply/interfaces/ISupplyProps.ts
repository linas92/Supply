import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISupplyProps {
  title: string;
  description: string;
  percentage: number;
  showPercentageValue: boolean;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  webURL: string;
}
