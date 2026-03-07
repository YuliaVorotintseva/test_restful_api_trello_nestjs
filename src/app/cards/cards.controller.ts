import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CardsService } from "./cards.service";
import { CreateCardDTO } from "./create-card.dto";
import { UpdateCardDTO } from "./update-card.dto";
import { OwnershipGuard } from "src/shared/guards/ownership.guard";
import { Resource } from "src/shared/decorators/resource.decorator";
import { ResourceType } from "src/shared/types/main";
import { Card } from "src/entities/card.entity";

@ApiTags('Cards')
@Controller('/columns/:columnId/cards')
@UseGuards(AuthGuard('jwt'))
export class CardsController {
    constructor(private cardsService: CardsService) { }

    @Post()
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COLUMN)
    @ApiOperation({ summary: 'Creates new card in column' })
    @ApiParam({ name: 'columnId', required: true, description: 'Column identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Card })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Users can create card only in their own columns' })
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
    @ApiOperation({ summary: 'Gets cards in column' })
    @ApiParam({ name: 'columnId', required: true, description: 'Column identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Array<Card> })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Users can get cards only in their own columns' })
    findAllByColumn(@Param('columnId') columnId: string, @Request() request) {
        return this.cardsService.fineAllByColumn(+columnId);
    }

    @Get(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.CARD)
    @ApiOperation({ summary: 'Gets one specific card' })
    @ApiParam({ name: 'id', required: true, description: 'Card identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Card })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Users can get card only in their own columns' })
    findOne(
        @Param('id') id: string,
        @Request() request
    ) {
        return this.cardsService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.CARD)
    @ApiOperation({ summary: 'Updates one specific card' })
    @ApiParam({ name: 'id', required: true, description: 'Card identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Card })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Users can update only their own card' })
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
    @ApiOperation({ summary: 'Delete one specific card' })
    @ApiParam({ name: 'id', required: true, description: 'Card identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Users can delete only their own cards' })
    remove(
        @Param('id') id: string,
        @Request() request
    ) {
        return this.cardsService.remove(+id);
    }
}