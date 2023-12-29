import * as React from "react";

interface IReminderProps {
  reminder: string;
}
interface IReminderState {
  editing: boolean;
}

export default class Reminder extends React.Component<
  IReminderProps,
  IReminderState
> {
  /**
   *
   */
  constructor(props: IReminderProps) {
    super(props);

    // bind our methods

    //set initial state
    this.state = {
      editing: false,
    };
  }

  public render() {
    return <div>{this.props.reminder}</div>;
  }
}
