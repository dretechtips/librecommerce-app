import { Module } from "@nestjs/common";
import FeedService from "./Feed.service";

@Module({
	controllers: [],
	providers: [FeedService],
})
export class FeedModule {
	
}

export default FeedModule;