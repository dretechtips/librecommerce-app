import { Module } from "@nestjs/common";
import CodeController from "./Code.controller";

@Module({
	controllers: [CodeController]
})
export class CodeModule {

}

export default CodeModule;