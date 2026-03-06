import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { CommentsService } from "./comments.service";
import { CreateCommentDTO } from "./create-comment.dto";
import { UpdateCommentDTO } from "./update-comment.dto";

@Controller('/cards/:cardId/comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
    constructor(private commentsService: CommentsService) { }

    @Post()
    create(@Param('cardId') cardId: string, @Body() createCommentDTO: CreateCommentDTO, @Request() request) {
        return this.commentsService.create(createCommentDTO, +cardId, +request.author.authorId);
    }

    @Get()
    findAllByCard(@Param('cardId') cardId: string, @Request() request) {
        return this.commentsService.fineAllByCard(+cardId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() request) {
        return this.commentsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCommentDTO: UpdateCommentDTO, @Request() request) {
        return this.commentsService.update(+id, updateCommentDTO, +request.author.authorId);
    }

    @Delete(':id')
    remove(@Param('cardId') cardId: string, @Param('id') id: string, @Request() request) {
        return this.commentsService.remove(+id, +cardId);
    }
}