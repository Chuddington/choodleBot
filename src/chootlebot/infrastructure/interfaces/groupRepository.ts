import { Id } from "../../domain/user/id";

export interface GroupRepository {

  getDomainGroup(externalGroup: Id): { internalId?: Id, err?: Error };
  getExternalGroup(internalGroup: Id): { externalId?: Id, err?: Error };
}
