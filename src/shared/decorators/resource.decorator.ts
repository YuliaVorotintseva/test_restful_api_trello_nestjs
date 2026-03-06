import { SetMetadata } from "@nestjs/common";

import { ResourceType } from "../types/main";

export const Resource = (type: ResourceType) => SetMetadata('resourceType', type);