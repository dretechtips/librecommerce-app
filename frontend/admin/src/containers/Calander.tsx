import React, { Component } from "react";
import {
  CalanderProps,
  CalanderState,
  CalanderEvent,
  CalanderViewMode,
  CalanderDay
} from "../interface/Calander.interface";
import CalanderUI from "../components/Calander";

export class Calander extends Component<CalanderProps, CalanderState> {
  private static NO_EVENTS: CalanderEvent = {
    name: "NO EVENT",
    description: "There isn't any event today.",
    start: new Date(new Date().toLocaleDateString()),
    end: new Date(new Date(new Date().toLocaleDateString()).getTime() - 1)
  };
  constructor(props: CalanderProps) {
    super(props);
    this.state = {
      mode: this.props.mode,
      events: []
    };
  }
  async componentDidMount() {
    const events: CalanderEvent[] = await this.props.getEvents(
      this.props.start,
      this.props.mode
    );
    this.setState({
      ...this.state,
      events: this.organize(this.state.mode, events)
    });
  }
  public handleMode = async (mode: CalanderViewMode) => {
    this.setState({
      ...this.state,
      mode,
      events: this.organize(mode, [
        ...(await this.props.getEvents(this.props.start, mode))
      ])
    });
  };
  private sortEventsIntoDays(sorted: CalanderEvent[]): CalanderDay[] {
    const array: CalanderDay[] = [];
    if (sorted[0] === undefined) {
      return [];
    }
    let curDate: string = sorted[0].start.toLocaleDateString();
    let curEvents: CalanderEvent[] = [];
    sorted.forEach((cur, index) => {
      if (cur.start.toLocaleDateString() === curDate) {
        curEvents.push(cur);
      } else {
        array.push({ day: curDate, events: curEvents });
        curDate = cur.start.toLocaleDateString();
        curEvents = [];
      }
      if (index === sorted.length - 1) {
        curDate = cur.start.toLocaleDateString();
        array.push({ day: curDate, events: [cur] });
      }
    });
    return array;
  }
  private fillIntoTimeframe(
    events: CalanderDay[],
    days: number
  ): CalanderDay[] {
    const oneDayInMS: number = 1000 * 60 * 60 * 24;
    if (events[0] === undefined)
      return Array(days)
        .fill(null)
        .map<CalanderDay>((cur, index) => {
          const baseDate: Date = new Date();
          const date: Date = new Date(baseDate.getTime() + index * oneDayInMS);
          return {
            day: date.toLocaleDateString(),
            events: [Calander.NO_EVENTS]
          };
        });
    else {
      const calander: (CalanderDay | null)[] = new Array(days).fill(null);
      let base: CalanderDay = events[0];
      events.forEach(cur => {
        const MSdiff: number =
          new Date(cur.day).getTime() - new Date(base.day).getTime();
        const dayDiff: number = Math.round(MSdiff / oneDayInMS);
        if (dayDiff > -1 && dayDiff < days) {
          calander[dayDiff] = cur;
        }
      });
      return calander.map<CalanderDay>((cur, index) => {
        if (cur === null) {
          const baseDate: Date = new Date(base.day);
          const date: Date = new Date(baseDate.getTime() + index * oneDayInMS);
          return {
            day: date.toLocaleDateString(),
            events: [Calander.NO_EVENTS]
          };
        } else return cur;
      });
    }
  }
  public organize = (
    mode: CalanderViewMode,
    events: CalanderEvent[]
  ): CalanderDay[] => {
    let day: CalanderDay[];
    const sortedEvents: CalanderEvent[] = events.sort(
      (cur, next) => cur.start.getTime() - next.start.getTime()
    );
    const sortedDays: CalanderDay[] = this.sortEventsIntoDays(sortedEvents);
    switch (mode) {
      case "day":
        day = this.fillIntoTimeframe(sortedDays, 1);
        break;
      case "month":
        day = this.fillIntoTimeframe(sortedDays, 30);
        break;
      case "week":
        day = this.fillIntoTimeframe(sortedDays, 7);
        break;
      default:
        day = [];
        break;
    }
    return day;
  };
  render() {
    return (
      <CalanderUI
        {...this.props}
        mode={this.state.mode}
        events={this.state.events}
        handleMode={this.handleMode}
      />
    );
  }
}

export default Calander;
