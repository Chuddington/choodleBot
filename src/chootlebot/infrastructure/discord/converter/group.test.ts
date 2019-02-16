import { Converter } from "../../interfaces/converter";
import { DiscordGroupConverter } from "./group";
import { DiscordGroupRepository } from "../../memory/discordGroupRepository";
import { Id } from "../../../domain/user/id";

test("We can convert from an internal group to a Discord Group", async () => {
  const converter: Converter<Id, Id> =
    DiscordGroupConverter.instanceOf(DiscordGroupRepository.newInstance());

  const output = converter.from(Id.chootleBotGroup("10"));

  expect(output.err).toBe(undefined);
  expect(output.source).toEqual(Id.discordGroup("100"));

}, 100);


test(
  "We cannot use the wrong method to convert an internal group"
  + "to a discord group",
  async () => {

    const converter: Converter<Id, Id> =
      DiscordGroupConverter.instanceOf(DiscordGroupRepository.newInstance());

    const output = converter.from(Id.discordGroup("100"));

    expect(output.source).toBe(undefined);
    expect(output.err!.message)
      .toBe("The passed parameter needs to be a Domain Group ID!  Group: "
        + "Discord[100]");

  }, 100);


  test("We can convert from a Discord group to an Internal Group", async () => {
    const converter: Converter<Id, Id> =
      DiscordGroupConverter.instanceOf(DiscordGroupRepository.newInstance());

    const output = converter.to(Id.discordGroup("100"));

    expect(output.err).toBe(undefined);
    expect(output.target).toEqual(Id.chootleBotGroup("10"));

  }, 100);


  test(
    "We cannot use the wrong method to convert an internal group"
    + "to a discord group",
    async () => {

      const converter: Converter<Id, Id> =
        DiscordGroupConverter.instanceOf(DiscordGroupRepository.newInstance());

      const output = converter.to(Id.chootleBotGroup("10"));

      expect(output.target).toBe(undefined);
      expect(output.err!.message)
        .toBe("The passed parameter needs to be a Discord Group ID!  Group: "
          + "ChootleBot[10]");

    }, 100);
