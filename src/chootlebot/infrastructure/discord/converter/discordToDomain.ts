import { GroupRepository } from "../../interfaces/groupRepository";
import { Id } from "../../../domain/user/id";

import { UnaryConverter } from "../../interfaces/unaryConverter";

export class DiscordToDomainGroupConverter implements UnaryConverter<Id> {

  private readonly repository: GroupRepository;

  private constructor(repository: GroupRepository) {
    this.repository = repository;
  }

  static instanceOf(repository: GroupRepository): DiscordToDomainGroupConverter {
    return new DiscordToDomainGroupConverter(repository);
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
