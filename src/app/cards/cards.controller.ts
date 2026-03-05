import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CardsService } from "./cards.service";
import { CreateCardDTO } from "./create-card.dto";

@Controller('/columns/:columnId/cards')
@UseGuards(AuthGuard('jwt'))
export class CardsController {
    constructor(private cardsService: CardsService) { }

    @Post()
    create(@Param('columnId') columnId: string, @Body() createCardDTO: CreateCardDTO, @Request() request) {
        return this.cardsService.create(createCardDTO, parseInt(columnId), request.author.authorId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() request) {
        return this.cardsService.findOne(parseInt(id), request.author.authorId);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() request) {
        return this.cardsService.remove(parseInt(id), request.author.authorId);
    }
}