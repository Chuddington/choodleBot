import { IdType } from './idType';

export class Id {
  private readonly id: string;
  private readonly type: IdType;

  private constructor(id: string, type: IdType) {
    this.id = id;
    this.type = type;
  }

  static discordUser(id: string): Id {
    return new Id(id, IdType.DISCORD_USER);
  }

  static chootleBotUser(id: string): Id {
    return new Id(id, IdType.CHOOTLE_BOT_USER);
  }

  static discordGroup(id: string): Id {
    return new Id(id, IdType.DISCORD_GROUP);
  }

  static chootleBotGroup(id: string): Id {
    return new Id(id, IdType.CHOOTLE_BOT_GROUP);
  }

  getId(): string {
    return this.id;
  }

  isUserType(): boolean {
    return this.type.startsWith(IdType.USER_TYPE);
  }

  isDiscordUser(): boolean {
    return this.type === IdType.DISCORD_USER;
  }

  isChootleBotUser(): boolean {
    return this.type === IdType.CHOOTLE_BOT_USER;
  }

  isGroupType(): boolean {
    return this.type.startsWith(IdType.GROUP_TYPE);
  }

  isDiscordGroup(): boolean {
    return this.type === IdType.DISCORD_GROUP;
  }

  isChootleBotGroup(): boolean {
    return this.type === IdType.CHOOTLE_BOT_GROUP;
  }

  toString(): string {
    return `${this.type}[${this.id}]`;
  }
}
