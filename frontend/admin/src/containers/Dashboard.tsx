import React, { Component } from "react";
import { Card } from "../components/Card";
import {
  DashboardProps,
  DashboardState,
  DashboardPropsManager,
  DashboardSearch
} from "../interface/Dashboard.interface";
import { Link } from "react-router-dom";
import { Searchbar } from "../components/Searchbar";

class Dashboard extends Component<DashboardPropsManager, DashboardState> {
  static contextType = React.createContext<DashboardSearch>(() => {
    console.log("Dashboard has not updated.");
  });
  constructor(props: DashboardPropsManager) {
    super(props);
    this.state = {
      display: this.props.actions.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      }),
      search: this.props.search ? this.props.search : ""
    };
    Dashboard.contextType = React.createContext(this.search);
  }
  componentDidMount() {
    if (this.props.search) {
      this.search(this.props.search);
    }
  }
  public search: DashboardSearch = (value: string): void => {
    const actions: DashboardProps[] = this.props.actions.filter(cur =>
      new RegExp(value, "i").test(cur.title)
    );
    this.setState({ ...this.state, display: actions });
  };
  public renderProps(props: DashboardProps): JSX.Element {
    return (
      <div className="row mb-3">
        <div className="col-12">
          <Card title={props.title} theme="success">
            <div className="row">
              {props.icons.map(cur => (
                <Link
                  to={props.basePath + cur.path}
                  className="text-secondary col-6 col-sm-4 col-lg-3"
                >
                  <div className="p-3 text-center">
                    <i className={cur.icon + " fa-fw fa-3x mb-3"}></i>
                    <br />
                    <span>{cur.name.trim().replace(/ /gi, "\n")}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Searchbar
          placeholder={"Quickly filter out functions by typing here."}
          search={this.search}
          value={undefined}
        />
        {this.state.display.map(cur => this.renderProps(cur))}
      </div>
    );
  }
}

export default Dashboard;
