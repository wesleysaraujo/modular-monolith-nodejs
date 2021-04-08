import { asFunction, AwilixContainer, createContainer, Resolver } from "awilix";
import { Router } from "express";

export class ContainerBuilder {
  private container: AwilixContainer;

  constructor() {
    this.container = createContainer();
  }

  addRouting(createRouter: () => Router) {
    this.container.register({
      router: asFunction(createRouter),
    });

    return this;
  }

  register(entries: Record<string, Resolver<any>>) {
    this.container.register(entries);

    return this;
  }

  get router(): Router {
    return this.container.resolve("router");
  }

  build() {
    return this.container;
  }
}
