import { Converter } from "../../interfaces/converter";
import { DomainToDiscordGroupConverter } from "./domainToDiscord";
import { DiscordToDomainGroupConverter } from "./discordToDomain";
import { DiscordGroupRepository } from "../../memory/discordGroupRepository";
import { GroupRepository } from "../../interfaces/groupRepository";
import { Id } from "../../../domain/user/id";

function setupTestRepository(): GroupRepository {
  const result = DiscordGroupRepository.newInstance();
  result.addEntry(Id.chootleBotGroup("10"), Id.discordGroup("100"));

  return result;
}

test("We can convert from an internal group to a Discord Group", async () => {
  const converter: Converter<Id, Id> =
    DomainToDiscordGroupConverter.instanceOf(setupTestRepository());

  const output = converter.to(Id.chootleBotGroup("10"));

  expect(output.err).toBe(undefined);
  expect(output.target).toEqual(Id.discordGroup("100"));

}, 100);


test(
  "We cannot use the wrong method to convert an internal group"
  + "to a discord group",
  async () => {

    const converter: Converter<Id, Id> =
      DomainToDiscordGroupConverter.instanceOf(setupTestRepository());

    const output = converter.to(Id.discordGroup("100"));

    expect(output.target).toBe(undefined);
    expect(output.err!.message)
      .toBe("The passed parameter needs to be a Domain Group ID!  Group: "
        + "Discord[100]");

  }, 100);


test("We can convert from a Discord group to an Internal Group", async () => {
  const converter: Converter<Id, Id> =
    DiscordToDomainGroupConverter.instanceOf(setupTestRepository());

  const output = converter.to(Id.discordGroup("100"));

  expect(output.err).toBe(undefined);
  expect(output.target).toEqual(Id.chootleBotGroup("10"));

}, 100);


test(
  "We cannot use the wrong method to convert an internal group"
  + "to a discord group",
  async () => {

    const converter: Converter<Id, Id> =
      DiscordToDomainGroupConverter.instanceOf(setupTestRepository());

    const output = converter.to(Id.chootleBotGroup("10"));

    expect(output.target).toBe(undefined);
    expect(output.err!.message)
      .toBe("The passed parameter needs to be a Discord Group ID!  Group: "
        + "ChootleBot[10]");

  }, 100);
