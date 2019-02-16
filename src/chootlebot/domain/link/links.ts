import { AgnosticLink } from "./link";

export class AgnosticLinks {
  private readonly links: Set<AgnosticLink>;

  protected constructor(links: Set<AgnosticLink>) {
    this.links = links;
  }

  getLinks(): Set<AgnosticLink> {
    return this.links;
  }

  containsLinks(): boolean {
    return this.links.size > 0;
  }
}
