import { Module, Provider, DynamicModule } from "@nestjs/common";

@Module({
  controllers: [],
  providers: [StartupSerive]
})
export class StartupModule {
  public static wait(provider: Provider, fn: () => boolean): DynamicModule {}
}

export default StartupModule;
