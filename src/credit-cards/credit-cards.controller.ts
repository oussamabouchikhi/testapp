import { Controller, Get, Query } from '@nestjs/common';
import { CreditCardsService } from './credit-cards.service';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Get('stats')
  getCreditCardStats(@Query('size') size: string) {
    return this.creditCardsService.fetchCreditCardData(size);
  }
}
