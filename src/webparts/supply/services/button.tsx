import * as React from "react";
import { Stack, IStackTokens } from "@fluentui/react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";

export interface IButtonExampleProps {}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

export const ButtonDefaultExample: React.FunctionComponent<
  IButtonExampleProps
> = (props) => {
  const _alertClicked = (): any => {
    alert("HA! Nothing happened!");
  };
  return (
    <Stack horizontal tokens={stackTokens}>
      <DefaultButton
        text="Standard"
        onClick={_alertClicked}
        allowDisabledFocus
      />
      <PrimaryButton
        text="Primary"
        onClick={_alertClicked}
        allowDisabledFocus
      />
    </Stack>
  );
};
