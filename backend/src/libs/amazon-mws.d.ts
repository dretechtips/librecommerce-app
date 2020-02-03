import { FeedSubmit } from "src/vendor/amazon/feed/Feed.interface";

declare module "amazon-mws" {
  interface Feeds extends BaseAmazonMWS {
    submit: (
      data: FeedSubmit,
      fn: (err: string, res: string) => void
    ) => Promise<any>;
  }
}
