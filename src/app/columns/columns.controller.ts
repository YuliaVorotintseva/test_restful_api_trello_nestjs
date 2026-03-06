import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { ColumnService } from "./columns.service";
import { CreateColumnDTO } from "./create-column.dto";
import { UpdateColumnDTO } from "./update-column.dto";

@Controller('/users/:ownerId/columns')
@UseGuards(AuthGuard('jwt'))
export class ColumnsController {
    constructor(private columnsService: ColumnService) { }

    @Post()
    create(@Param('ownerId') ownerId: string, @Body() createColumnDTO: CreateColumnDTO, @Request() request) {
        return this.columnsService.create(createColumnDTO, +ownerId)
    }

    @Get()
    findAllByOwner(@Param('ownerId') ownerId: string, @Request() request) {
        return this.columnsService.fineAllByOwner(+ownerId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() request) {
        return this.columnsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateColumnDTO: UpdateColumnDTO,
        @Request() request
    ) {
        return this.columnsService.update(+id, updateColumnDTO, request.author.authorId);
    }

    @Delete(':id')
    remove(@Param('ownerId') ownerId: string, @Param('id') id: string, @Request() request) {
        return this.columnsService.remove(+id, +ownerId);
    }
}