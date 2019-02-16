import { GroupRepository } from "../interfaces/groupRepository";
import { Id } from "../../domain/user/id";

export class DiscordGroupRepository implements GroupRepository {

  private readonly internalToDiscord: Map<string, string>;
  private readonly discordToInternal: Map<string, string>;

  private internalGroupOne = "10";
  private internalGroupTwo = "20";
  private internalGroupThree = "30";

  private discordGroupOne = "100";
  private discordGroupTwo = "200";
  private discordGroupThree = "300";

  private constructor() {
    this.discordToInternal = this.setupDiscordEntries();
    this.internalToDiscord = this.setupInternalEntries();
  }

  private setupInternalEntries(): Map<string, string> {
    const result: Map<string, string> = new Map()
      .set(
        this.internalGroupOne,
        this.discordGroupOne)
      .set(
        this.internalGroupTwo,
        this.discordGroupTwo)
      .set(
        this.internalGroupThree,
        this.discordGroupThree);

    return result;
  }

  private setupDiscordEntries(): Map<string, string> {
    const result: Map<string, string> = new Map()
      .set(
        this.discordGroupOne,
        this.internalGroupOne)
      .set(
        this.discordGroupTwo,
        this.internalGroupTwo)
      .set(
        this.discordGroupThree,
        this.internalGroupThree);

    return result;
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

}
