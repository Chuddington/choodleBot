import { Id } from './id';

test('We can create a Discord User', async () => {
  const userId: Id = Id.discordUser('12345');

  expect(userId.isUserType()).toEqual(true);
  expect(userId.isDiscordUser()).toEqual(true);
  expect(userId.isChootleBotUser()).toEqual(false);
  expect(userId.getId()).toBe('12345');

}, 100);

test("We can create a ChootleBot User", async () => {
  const userId: Id = Id.chootleBotUser('23456');

  expect(userId.isUserType()).toEqual(true);
  expect(userId.isChootleBotUser()).toEqual(true);
  expect(userId.isDiscordUser()).toEqual(false);
  expect(userId.getId()).toBe('23456');

}, 100);

test('We can create a Discord Group', async () => {
  const groupId: Id = Id.discordGroup('12345');

  expect(groupId.isGroupType()).toEqual(true);
  expect(groupId.isDiscordGroup()).toEqual(true);
  expect(groupId.isChootleBotGroup()).toEqual(false);
  expect(groupId.getId()).toBe('12345');

}, 100);

test("We can create a ChootleBot Group", async () => {
  const groupId: Id = Id.chootleBotGroup('23456');

  expect(groupId.isGroupType()).toEqual(true);
  expect(groupId.isChootleBotGroup()).toEqual(true);
  expect(groupId.isDiscordGroup()).toEqual(false);
  expect(groupId.getId()).toBe('23456');

}, 100);
