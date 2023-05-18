import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @Render('index')
  index() {
    return {
      title: 'Кокос',
    };
  }
  @Get('/login')
  @Render('login')
  login() {
    return {
      title: 'Личный кабинет',
    };
  }
  @Get('/signup')
  @Render('signup')
  signup() {
    return {
      title: 'Личный кабинет',
    };
  }
  @Get('/account')
  @Render('account')
  account() {
    return {
      title: 'Личный кабинет',
    };
  }
  @Get('/basket')
  @Render('basket')
  basket() {
    return {
      title: 'Корзина',
    };
  }
  @Get('/catalog')
  @Render('catalog')
  catalog() {
    return {
      title: 'Каталог',
    };
  }
  @Get('/delivery')
  @Render('delivery')
  delivery() {
    return {
      title: 'Доставка',
    };
  }
  @Get('/faq')
  @Render('faq')
  faq() {
    return {
      title: 'FAQ',
    };
  }
  @Get('/favourites')
  @Render('favourites')
  favourites() {
    return {
      title: 'Избранное',
    };
  }
  @Get('/mail')
  @Render('mail')
  mail() {
    return {
      title: 'Сообщения',
    };
  }
  @Get('/stocks')
  @Render('stocks')
  stocks() {
    return {
      title: 'Акции',
    };
  }
  @Get('/wishlist')
  @Render('wishlist')
  wishlist() {
    return {
      title: 'Список желаний',
    };
  }
}
