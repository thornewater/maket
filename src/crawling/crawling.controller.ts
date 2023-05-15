import { Controller, Post, Body, Get } from '@nestjs/common';
import { CrawlingService } from './crawling.service';

@Controller('crawling')
export class CrawlingController {
  constructor(private readonly crawlingService: CrawlingService) {}

  @Post()
  create(@Body() req: { keyword: string }) {
    const { keyword } = req;
    return this.crawlingService.create(keyword);
  }
}
