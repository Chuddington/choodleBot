import { AgnosticLink } from "./link";
import { AgnosticLinks } from "./links";
import { Id } from "../user/id";

export class GroupLinks extends AgnosticLinks {
  private readonly groupId: Id;

  private constructor(link: Set<AgnosticLink>, groupId: Id) {
    super(link);

    this.groupId = groupId;
  }

  static of(links: Set<AgnosticLink>, groupId: Id): {
    links?: GroupLinks,
    err?: Error
  } {

    return (!groupId.isChootleBotGroup())
      ? {
        err: new Error(
          `The following is not an internal group!  ${groupId.toString()}`)
      }
      : { links: new GroupLinks(links, groupId) };
  }



  getGroupId(): Id {
    return this.groupId;
  }

}
