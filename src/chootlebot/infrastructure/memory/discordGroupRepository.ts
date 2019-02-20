import { GroupRepository } from "../interfaces/groupRepository";
import { Id } from "../../domain/user/id";

export class DiscordGroupRepository implements GroupRepository {

  private readonly internalToDiscord: Map<string, string>;
  private readonly discordToInternal: Map<string, string>;

  private constructor() {
    this.discordToInternal = new Map();
    this.internalToDiscord = new Map();
  }

  static newInstance(): GroupRepository {
    return new DiscordGroupRepository();
  }

  getDomainGroup(externalGroup: Id): { internalId?: Id, err?: Error } {
    return (this.discordToInternal.has(externalGroup.getId()))
      ? {
        internalId:
          Id.chootleBotGroup(this.discordToInternal.get(externalGroup.getId())!)
      }
      : {
        err: new Error(
          `Could not obtain requested entry!  ${externalGroup.toString()}`)
      };
  }

  getExternalGroup(internalGroup: Id): { externalId?: Id, err?: Error } {
    return (this.internalToDiscord.has(internalGroup.getId()))
      ? {
        externalId:
          Id.discordGroup(this.internalToDiscord.get(internalGroup.getId())!)
      }
      : {
        err: new Error(
          `Could not obtain requested entry!  ${internalGroup.toString()}`)
      };
  }

  addEntry(internalEntry: Id, externalEntry: Id): void {
    this.discordToInternal.set(externalEntry.getId(), internalEntry.getId());
    this.internalToDiscord.set(internalEntry.getId(), externalEntry.getId());
  }

  removeEntry(entry: Id): void {
    if (this.discordToInternal.has(entry.getId())) {
      this.discordToInternal.delete(entry.getId());
    }
    if (this.internalToDiscord.has(entry.getId())) {
      this.internalToDiscord.delete(entry.getId());
    }
  }

}
