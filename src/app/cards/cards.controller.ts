import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { CardsService } from "./cards.service";
import { CreateCardDTO } from "./create-card.dto";
import { UpdateCardDTO } from "./update-card.dto";

@Controller('/columns/:columnId/cards')
@UseGuards(AuthGuard('jwt'))
export class CardsController {
    constructor(private cardsService: CardsService) { }

    @Post()
    create(
        @Param('columnId') columnId: string,
        @Body() createCardDTO: CreateCardDTO,
        @Request() request
    ) {
        return this.cardsService.create(createCardDTO, +columnId, request.author.authorId);
    }

    @Get()
    findAllByColumn(@Param('columnId') columnId: string, @Request() request) {
        return this.cardsService.fineAllByColumn(+columnId);
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
        @Request() request
    ) {
        return this.cardsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCardDTO: UpdateCardDTO,
        @Request() request
    ) {
        return this.cardsService.update(+id, updateCardDTO, +request.author.authorId);
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @Request() request
    ) {
        return this.cardsService.remove(+id, +request.author.authorId);
    }
}