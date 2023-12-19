import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx } from "@pnp/sp";
// import { LogLevel, PnPLogging } from "@pnp/logging";

let _sp: SPFI | null = null; //this meants it can both be null and type spfi

export const getSP = (context?: WebPartContext): SPFI | null => {
  if (_sp === null && context != null) {
    _sp = spfi(context.pageContext.site.absoluteUrl).using(SPFx(context));
  }
  return _sp;
};
