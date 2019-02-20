import { GroupRepository } from "../interfaces/groupRepository";
import { DiscordGroupRepository } from "./discordGroupRepository";
import { Id } from "../../domain/user/id";

const testRepository: GroupRepository = DiscordGroupRepository.newInstance();

test("There should be entries within the Map using a discord group",
  async () => {
    testRepository.addEntry(Id.chootleBotGroup("10"), Id.discordGroup("100"));

    const { internalId: domainId, err: error } =
      testRepository.getDomainGroup(Id.discordGroup("100"));

    expect(error).toBe(undefined);
    expect(domainId).toEqual(Id.chootleBotGroup("10"));
  }, 100);

test("There should be entries within the Map using an internal group",
  async () => {
    testRepository.addEntry(Id.chootleBotGroup("10"), Id.discordGroup("100"));
    
    const { externalId: domainId, err: error } =
      testRepository.getExternalGroup(Id.chootleBotGroup("10"));

    expect(error).toBe(undefined);
    expect(domainId).toEqual(Id.discordGroup("100"));
  }, 100);
