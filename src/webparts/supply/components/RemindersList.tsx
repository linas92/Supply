import * as React from "react";
import Reminder from "./Reminder";

interface IRemindersListProps {
  listName: string;
}

interface IRemindersListsState {
  reminders: string[];
  newReminderLabel: string;
}

export default class RemindersList extends React.Component<
  IRemindersListProps,
  IRemindersListsState
> {
  constructor(props: IRemindersListProps) {
    super(props);
    //Binding our methods
    this.updateNewReminderLabel = this.updateNewReminderLabel.bind(this);
    this.addNewreminder = this.addNewreminder.bind(this);

    //Setting our initial state
    this.state = {
      reminders: ["Get good at react", "Learn SPFx"],
      newReminderLabel: "",
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <ul>
          <h1>{this.props.listName}</h1>
          {this.state.reminders.map((reminder, index) => {
            return <li key={index}><Reminder reminder={reminder}/></li>;
          })}
        </ul>
        <input
          type="text"
          value={this.state.newReminderLabel}
          onChange={this.updateNewReminderLabel}
        />
        <button onClick={this.addNewreminder}>+</button>
      </div>
    );
  }

  public updateNewReminderLabel(
    event: React.FormEvent<HTMLInputElement>
  ): void {
    this.setState({
      newReminderLabel: event.currentTarget.value,
    });
  }

  public addNewreminder(): void {
    if (!this.state.newReminderLabel.length) return;
    this.setState({
      reminders: [...this.state.reminders, this.state.newReminderLabel],
      newReminderLabel: "",
    });
  }
}
