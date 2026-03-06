import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { CardsService } from "./cards.service";
import { CreateCardDTO } from "./create-card.dto";
import { UpdateCardDTO } from "./update-card.dto";
import { OwnershipGuard } from "src/shared/guards/ownership.guard";
import { Resource } from "src/shared/decorators/resource.decorator";
import { ResourceType } from "src/shared/types/main";

@Controller('/columns/:columnId/cards')
@UseGuards(AuthGuard('jwt'))
export class CardsController {
    constructor(private cardsService: CardsService) { }

    @Post()
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COLUMN)
    create(
        @Param('columnId') columnId: string,
        @Body() createCardDTO: CreateCardDTO,
        @Request() request
    ) {
        return this.cardsService.create(createCardDTO, +columnId, request.author.authorId);
    }

    @Get()
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COLUMN)
    findAllByColumn(@Param('columnId') columnId: string, @Request() request) {
        return this.cardsService.fineAllByColumn(+columnId);
    }

    @Get(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.CARD)
    findOne(
        @Param('id') id: string,
        @Request() request
    ) {
        return this.cardsService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.CARD)
    update(
        @Param('id') id: string,
        @Body() updateCardDTO: UpdateCardDTO,
        @Request() request
    ) {
        return this.cardsService.update(+id, updateCardDTO);
    }

    @Delete(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.CARD)
    remove(
        @Param('id') id: string,
        @Request() request
    ) {
        return this.cardsService.remove(+id);
    }
}