import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CommentsService } from "./comments.service";
import { CreateCommentDTO } from "./create-comment.dto";
import { UpdateCommentDTO } from "./update-comment.dto";
import { OwnershipGuard } from "src/shared/guards/ownership.guard";
import { Resource } from "src/shared/decorators/resource.decorator";
import { ResourceType } from "src/shared/types/main";
import { Comment } from "src/entities/comment.entitiy";

@ApiTags('Comments')
@Controller('/cards/:cardId/comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
    constructor(private commentsService: CommentsService) { }

    @Post()
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.CARD)
    @ApiOperation({ summary: 'Creates new comment' })
    @ApiParam({ name: 'cardId', required: true, description: 'Card identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Comment })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Only authorized users can write comments' })
    create(@Param('cardId') cardId: string, @Body() createCommentDTO: CreateCommentDTO, @Request() request) {
        return this.commentsService.create(createCommentDTO, +cardId, +request.author.authorId);
    }

    @Get()
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.CARD)
    @ApiOperation({ summary: 'Gets all comments of the card' })
    @ApiParam({ name: 'cardId', required: true, description: 'Card identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Array<Comment> })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    findAllByCard(@Param('cardId') cardId: string, @Request() request) {
        return this.commentsService.fineAllByCard(+cardId);
    }

    @Get(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COMMENT)
    @ApiOperation({ summary: 'Gets one specific comment of the card' })
    @ApiParam({ name: 'id', required: true, description: 'Comment identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Array<Comment> })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    findOne(@Param('id') id: string, @Request() request) {
        return this.commentsService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COMMENT)
    @ApiOperation({ summary: 'Updates one specific comment' })
    @ApiParam({ name: 'id', required: true, description: 'Comment identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Comment })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Users can update only their own comments' })
    update(@Param('id') id: string, @Body() updateCommentDTO: UpdateCommentDTO) {
        return this.commentsService.update(+id, updateCommentDTO);
    }

    @Delete(':id')
    @UseGuards(OwnershipGuard)
    @Resource(ResourceType.COMMENT)
    @ApiOperation({ summary: 'Deletes one specific comment' })
    @ApiParam({ name: 'id', required: true, description: 'Comment identifier' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Comment })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Users can delete only their own comments' })
    remove(@Param('id') id: string, @Request() request) {
        return this.commentsService.remove(+id);
    }
}