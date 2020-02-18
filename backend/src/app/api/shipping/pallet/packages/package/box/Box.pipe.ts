import { ValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import BoxService from "./Box.service";

export class BoxValidationPipe extends ValidationPipeFactory(BoxService) {}
