import { GroupRepository } from "../../interfaces/groupRepository";
import { Id } from "../../../domain/user/id";

import { UnaryConverter } from "../../interfaces/unaryConverter";

export class DiscordGroupConverter implements UnaryConverter<Id> {

  private readonly repository: GroupRepository;

  private constructor(repository: GroupRepository) {
    this.repository = repository;
  }

  static instanceOf(repository: GroupRepository): DiscordGroupConverter {
    return new DiscordGroupConverter(repository);
  }

  /**
   * Method to convert a ChootleBot Group ID into a Discord Group ID
   */
  from(internalGroup: Id): { source?: Id, err?: Error } {
    if (!internalGroup.isChootleBotGroup()) {
      return {
        err: new TypeError(
          `The passed parameter needs to be a Domain Group ID!  ${internalGroup.toString()}`)
      };
    }

    const repoResult = this.repository.getExternalGroup(internalGroup);

    return (repoResult.externalId === undefined)
      ? { err: repoResult.err }
      : { source: repoResult.externalId! };
  }

  /**
   * Method to convert a Discord Group ID into a ChootleBot Group ID
   */
  to(externalGroup: Id): { target?: Id, err?: Error } {
    if (!externalGroup.isDiscordGroup()) {
      return {
        err: new TypeError(
          `The passed parameter needs to be a Discord Group ID!  ${externalGroup.toString()}`)
      };
    }

    const repoResult = this.repository.getDomainGroup(externalGroup);

    return (repoResult.internalId === undefined)
      ? { err: repoResult.err }
      : { target: repoResult.internalId! };
  }
}
