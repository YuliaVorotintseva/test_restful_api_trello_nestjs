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
        return this.commentsService.create(createCommentDTO, parseInt(cardId), parseInt(request.author.authorId));
    }

    @Get(':id')
    findOne(@Param('cardId') cardId: string, @Param('id') id: string, @Request() request) {
        return this.commentsService.findOne(parseInt(id), parseInt(cardId));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCommentDTO: UpdateCommentDTO, @Request() request) {
        return this.commentsService.update(parseInt(id), updateCommentDTO, parseInt(request.author.authorId));
    }

    @Delete(':id')
    remove(@Param('cardId') cardId: string, @Param('id') id: string, @Request() request) {
        return this.commentsService.remove(parseInt(id), parseInt(cardId));
    }

}