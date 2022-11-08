import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './AppService';
import { Feature } from '../common/enums/Feature';
import { IState } from '../common/types/IState';

@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
  ) {}

  @Get('')
  @Render('index')
  public index(): Partial<IState> {
    const products = this.appService.getProducts();

    return {
      [Feature.COMMON]: {
        products,
      }
    }
  }
}
