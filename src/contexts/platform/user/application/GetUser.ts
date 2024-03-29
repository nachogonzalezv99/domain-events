export class GetUser {
  constructor() {}

  async run(id: string) {
    return { id: "1", name: "nacho", socialNetworks:{all:"any"} };
  }
}
