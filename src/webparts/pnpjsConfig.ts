import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx } from "@pnp/sp";

let _sp: SPFI | null = null;

export const getSP = (context?: WebPartContext): SPFI | null => {
  if (_sp === null && context != null) {
    _sp = spfi(context.pageContext.site.absoluteUrl).using(SPFx(context));
  }
  return _sp;
};
