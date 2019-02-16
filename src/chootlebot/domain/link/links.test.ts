import { AgnosticLink } from "./link";
import { GroupLinks } from "./groupLinks";
import { Id } from "../user/id";

const elementOne = AgnosticLink.from("http://domain.com/link1");
const elementTwo = AgnosticLink.from("http://someOtherDomain.com/link2");
const inputSet: Set<AgnosticLink> = new Set()
  .add(elementOne.link!)
  .add(elementTwo.link!);

test("A link can be created", async () => {
  const result = AgnosticLink.from("http://domain.com/link");

  expect(result.err).toBe(undefined);
  expect(result.link!.getLink()).toBe("http://domain.com/link");
}, 100);


test("A non-link cannot be created", async () => {
  const result = AgnosticLink.from("thisIsNotARealLink");

  expect(result.link).toBe(undefined);
  expect(result.err!.message).toBe("Invalid URL: thisIsNotARealLink");
}, 100);


test("A set of links can be created", async () => {
  const result = GroupLinks.of(inputSet, Id.chootleBotGroup("123456"));

  expect(result.err).toBe(undefined);
  expect(result.links!.containsLinks()).toBe(true);
  expect(result.links!.getLinks()).toBe(inputSet);

}, 100);


test("Non-internal group-specific links cannot be created", async () => {
  const result = GroupLinks.of(inputSet, Id.discordGroup("123456"));

  expect(result.links).toBe(undefined);
  expect(result.err!.message).toBe(
    "The following is not an internal group!  Group: Discord[123456]");

}, 100);
