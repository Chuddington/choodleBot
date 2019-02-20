import { GroupRepository } from "../../interfaces/groupRepository";
import { Id } from "../../../domain/user/id";

import { UnaryConverter } from "../../interfaces/unaryConverter";

export class DomainToDiscordGroupConverter implements UnaryConverter<Id> {

  private readonly repository: GroupRepository;

  private constructor(repository: GroupRepository) {
    this.repository = repository;
  }

  static instanceOf(repository: GroupRepository): DomainToDiscordGroupConverter {
    return new DomainToDiscordGroupConverter(repository);
  }

  /**
   * Method to convert a ChootleBot Group ID into a Discord Group ID
   */
  to(internalGroup: Id): { target?: Id, err?: Error } {
    if (!internalGroup.isChootleBotGroup()) {
      return {
        err: new TypeError(
          `The passed parameter needs to be a Domain Group ID!  ${internalGroup.toString()}`)
      };
    }

    const repoResult = this.repository.getExternalGroup(internalGroup);

    return (repoResult.externalId === undefined)
      ? { err: repoResult.err }
      : { target: repoResult.externalId! };
  }
}
