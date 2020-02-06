import { Module, DynamicModule } from "@nestjs/common";
import DatabaseService from "./Database.service";

@Module({
  controllers: []
})
export class DatabaseModule {
  public static forRoot(configPath: string): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: "DATABASE_CONFIG",
          useValue: configPath
        },
        DatabaseService
      ]
    };
  }
}

export default DatabaseModule;
