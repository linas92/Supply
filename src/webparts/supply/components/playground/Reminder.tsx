import * as React from "react";

interface IReminderProps {
  reminder: string;
  updateReminder(value: string): void;
  deleteReminder(): void;
}
interface IReminderState {
  editing: boolean;
}

export default class Reminder extends React.Component<
  IReminderProps,
  IReminderState
> {
  constructor(props: IReminderProps) {
    super(props);

    // bind our methods
    this.toggleEditing = this.toggleEditing.bind(this);
    this.reminder = this.reminder.bind(this);
    this.changeReminder = this.changeReminder.bind(this);

    //set initial state
    this.state = {
      editing: false,
    };
  }

  public render() {
    return (
      <div>
        {this.reminder()}
        <button onClick={this.toggleEditing}>
          {this.state.editing ? "Save" : "Edit"}
        </button>
        <button onClick={this.props.deleteReminder}>Delete</button>
      </div>
    );
  }

  public toggleEditing(): void {
    this.setState({
      editing: !this.state.editing,
    });
  }

  public reminder(): JSX.Element {
    let reminder: JSX.Element;
    if (this.state.editing) {
      reminder = (
        <input
          type="text"
          value={this.props.reminder}
          onChange={this.changeReminder}
        />
      );
    } else {
      reminder = <span>{this.props.reminder}</span>;
    }
    return reminder;
  }

  public changeReminder(event: React.FormEvent<HTMLInputElement>): void {
    this.props.updateReminder(event.currentTarget.value);
  }
}
