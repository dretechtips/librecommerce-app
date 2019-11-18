import React from "react";
import { LookupbarUIProps } from "../interface/Lookupbar.interface";
import Searchbar from "./Searchbar";
import { useHistory } from "react-router-dom";

export function Lookupbar<T>(props: LookupbarUIProps<T>) {
  const history = useHistory();
  return (
    <div>
      <Searchbar
        placeholder="Lookup an item..."
        buttons={[
          { icon: "fas fa-plus", action: () => history.push(props.add) }
        ]}
        search={props.processor}
      />
      {props.result && (
        <div className="row">
          <div className="col-12">
            {props.result.map((cur, index) => (
              <React.Fragment>
                <div
                  className={
                    "align-items-center media " +
                    (props.highlighted === index ? "bg-light" : "")
                  }
                  onMouseOver={() => props.highlight(index)}
                  onMouseLeave={props.unhighlight}
                >
                  {cur.image && (
                    <img
                      src={cur.image}
                      className="img-fluid mr-3"
                      alt="Lookup Image"
                      style={{ height: "5rem" }}
                    />
                  )}
                  <div className="media-body">
                    <p className="font-weight-bold mb-1">{cur.title}</p>
                    <p className="text-muted">
                      {window.innerWidth < 992
                        ? cur.description.substr(0, 20) + "..."
                        : cur.description.substr(0, 150) + "..."}
                    </p>
                  </div>
                </div>
                {index !== props.result.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Lookupbar;
