import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { CommentsService } from "./comments.service";
import { CreateCommentDTO } from "./create-comment.dto";
import { UpdateCommentDTO } from "./update-comment.dto";
import { OwnershipGuard } from "src/shared/guards/ownership.guard";
import { Resource } from "src/shared/decorators/resource.decorator";
import { ResourceType } from "src/shared/types/main";

@Controller('/cards/:cardId/comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
    constructor(private commentsService: CommentsService) { }

    @Post()
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.CARD)
    create(@Param('cardId') cardId: string, @Body() createCommentDTO: CreateCommentDTO, @Request() request) {
        return this.commentsService.create(createCommentDTO, +cardId, +request.author.authorId);
    }

    @Get()
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.CARD)
    findAllByCard(@Param('cardId') cardId: string, @Request() request) {
        return this.commentsService.fineAllByCard(+cardId);
    }

    @Get(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COMMENT)
    findOne(@Param('id') id: string, @Request() request) {
        return this.commentsService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COMMENT)
    update(@Param('id') id: string, @Body() updateCommentDTO: UpdateCommentDTO) {
        return this.commentsService.update(+id, updateCommentDTO);
    }

    @Delete(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COMMENT)
    remove(@Param('id') id: string, @Request() request) {
        return this.commentsService.remove(+id);
    }
}