import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ColumnService } from "./columns.service";
import { CreateColumnDTO } from "./create-column.dto";
import { UpdateColumnDTO } from "./update-column.dto";
import { OwnershipGuard } from "src/shared/guards/ownership.guard";
import { Resource } from "src/shared/decorators/resource.decorator";
import { ResourceType } from "src/shared/types/main";
import { ColumnEntity } from "src/entities/column.entity";

@ApiTags('Columns')
@Controller('/users/:ownerId/columns')
@UseGuards(AuthGuard('jwt'))
export class ColumnsController {
    constructor(private columnsService: ColumnService) { }

    @Post()
    @UseGuards(OwnershipGuard)
    @ApiOperation({ summary: 'Creates new column' })
    @ApiParam({ name: 'ownerId', required: true, description: 'Owner identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: ColumnEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    create(@Param('ownerId') ownerId: string, @Body() createColumnDTO: CreateColumnDTO, @Request() request) {
        return this.columnsService.create(createColumnDTO, +ownerId)
    }

    @Get()
    @UseGuards(OwnershipGuard)
    @ApiOperation({ summary: 'Gets user\'s columns' })
    @ApiParam({ name: 'ownerId', required: true, description: 'Owner identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Array<ColumnEntity> })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Users can get only their own columns' })
    findAllByOwner(@Param('ownerId') ownerId: string, @Request() request) {
        return this.columnsService.fineAllByOwner(+ownerId);
    }

    @Get(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COLUMN)
    @ApiOperation({ summary: 'Gets one specific column' })
    @ApiParam({ name: 'id', required: true, description: 'Column identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: ColumnEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Users can get only their own columns' })
    findOne(@Param('id') id: string, @Request() request) {
        return this.columnsService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COLUMN)
    @ApiOperation({ summary: 'Updates one specific column' })
    @ApiParam({ name: 'id', required: true, description: 'Column identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: ColumnEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Users can update only their own columns' })
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
    @ApiOperation({ summary: 'Delete one specific column' })
    @ApiParam({ name: 'id', required: true, description: 'Column identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Users can delete only their own column' })
    remove(@Param('id') id: string, @Request() request) {
        return this.columnsService.remove(+id);
    }
}