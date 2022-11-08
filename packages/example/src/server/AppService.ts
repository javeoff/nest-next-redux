import { Injectable } from '@nestjs/common';
import { IProduct } from '../common/types/IProduct';

@Injectable()
export class AppService {
  public getProducts(): IProduct[] {
    return [
      {
        id: '1',
        price: 200,
        name: 'Product 1',
      },
      {
        id: '2',
        price: 100,
        name: 'Product 2',
      }
    ];
  }
}
