import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ColumnService } from "./columns.service";
import { CreateColumnDTO } from "./create-column.dto";

@Controller('/users/:ownerId/columns')
@UseGuards(AuthGuard('jwt'))
export class ColumnsController {
    constructor(private columnsService: ColumnService) { }

    @Post()
    create(@Param('ownerId') ownerId: string, @Body() createColumnDTO: CreateColumnDTO, @Request() request) {
        return this.columnsService.create(createColumnDTO, parseInt(ownerId))
    }

    @Get(':id')
    findOne(@Param('ownerId') ownerId: string, @Param('id') id: string, @Request() request) {
        return this.columnsService.findOne(parseInt(id), parseInt(ownerId));
    }

    @Delete(':id')
    remove(@Param('ownerId') ownerId: string, @Param('id') id: string, @Request() request){
        return this.columnsService.remove(parseInt(id), parseInt(ownerId));
    }
}