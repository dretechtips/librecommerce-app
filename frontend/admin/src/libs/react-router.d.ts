import { NoRequired } from "../utils/Types";
import { StaticContext } from "react-router";

declare module "react-router" {
  /**
   * Params props key must be ? and have a union typeof { undefined }
   *
   */
  interface RouteComponentProps<
    Params extends NoRequired<Params>,
    C extends StaticContext = any,
    S = any
  > {}
}
