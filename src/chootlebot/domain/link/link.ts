import { URL } from 'url';

export class AgnosticLink {
  private readonly link: URL;

  protected constructor(link: URL) {
    this.link = link;
  }

  static from(link: string): {link?: AgnosticLink, err?: TypeError} {
    try {
      return {link: new AgnosticLink(new URL(link))};
    } catch (typeError) {
      return {err: typeError};
    }
  }

  getLink(): string {
    return this.link.href;
  }
}
