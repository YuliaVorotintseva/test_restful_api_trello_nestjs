import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { ColumnService } from "./columns.service";
import { CreateColumnDTO } from "./create-column.dto";
import { UpdateColumnDTO } from "./update-column.dto";
import { OwnershipGuard } from "src/shared/guards/ownership.guard";
import { Resource } from "src/shared/decorators/resource.decorator";
import { ResourceType } from "src/shared/types/main";

@Controller('/users/:ownerId/columns')
@UseGuards(AuthGuard('jwt'))
export class ColumnsController {
    constructor(private columnsService: ColumnService) { }

    @Post()
    @UseGuards(OwnershipGuard)
    create(@Param('ownerId') ownerId: string, @Body() createColumnDTO: CreateColumnDTO, @Request() request) {
        return this.columnsService.create(createColumnDTO, +ownerId)
    }

    @Get()
    @UseGuards(OwnershipGuard)
    findAllByOwner(@Param('ownerId') ownerId: string, @Request() request) {
        return this.columnsService.fineAllByOwner(+ownerId);
    }

    @Get(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COLUMN)
    findOne(@Param('id') id: string, @Request() request) {
        return this.columnsService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COLUMN)
    update(
        @Param('id') id: string,
        @Body() updateColumnDTO: UpdateColumnDTO,
        @Request() request
    ) {
        return this.columnsService.update(+id, updateColumnDTO);
    }

    @Delete(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COLUMN)
    remove(@Param('id') id: string, @Request() request) {
        return this.columnsService.remove(+id);
    }
}