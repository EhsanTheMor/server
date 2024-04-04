import { Body, Controller, Get, Param, Post } from '@nestjs/common';

// TODO: setup serilization for routes
// TODO: setup guards auth and admin
// TODO: setup tutorial routes
@Controller('tutorial')
export class TutorialController {
  @Get()
  getAppTutorials() {}

  @Get('/:id')
  getOneTutorial(@Param('id') id: number) {}

  @Post()
  createNewTutorial(@Body() body: any) {}
}
