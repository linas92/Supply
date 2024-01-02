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
    this.addNewReminder = this.addNewReminder.bind(this);
    this.updateReminder = this.updateReminder.bind(this);

    //Setting our initial state
    this.state = {
      reminders: [
      ],
      newReminderLabel: "",
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <ul>
          <h1>{this.props.listName}</h1>
          {this.state.reminders.map((reminder, index) => {
            return (
              <li key={index}>
                <Reminder
                  reminder={reminder}
                  updateReminder={(value: string) =>
                    this.updateReminder(index, value)
                  }
                  deleteReminder={() => this.deleteReminder(index)}
                />
              </li>
            );
          })}
        </ul>
        <input
          type="text"
          value={this.state.newReminderLabel}
          onChange={this.updateNewReminderLabel}
        />
        <button onClick={this.addNewReminder}>+</button>
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

  public addNewReminder(): void {
    if (!this.state.newReminderLabel.length) return;

    this.setState({
      reminders: [...this.state.reminders, this.state.newReminderLabel],
      newReminderLabel: "",
    });
  }

  public updateReminder(index: number, value: string): void {
    const updatedReminders = this.state.reminders;
    updatedReminders[index] = value;

    this.setState({
      reminders: updatedReminders,
    });
  }

  public deleteReminder(index: number): void {
    const updatedReminders = this.state.reminders;
    updatedReminders.splice(index, 1);

    this.setState({
      reminders: updatedReminders,
    });
  }
}
