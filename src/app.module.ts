import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { FaqModule } from './faq/faq.module';
import { SpecialOfferModule } from './special-offer/special.module';
import { BasketModule } from './basket/basket.module';
import { OrderModule } from './order/order.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppGatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    BookModule,
    UserModule,
    BasketModule,
    MailModule,
    OrderModule,
    WishlistModule,
    SpecialOfferModule,
    FaqModule,
    AppGatewayModule,
    AuthModule.forRoot({
      connectionURI:
        'https://dev-e53049d1e3bb11edae38099579cc48fa-eu-west-1.aws.supertokens.io:3569',
      apiKey: 'svsW0CvyknbzyYI=QokseZAa3Kr-gV',
      appInfo: {
        appName: 'Kokos',
        apiDomain: 'https://web-tatia.onrender.com/api',
        websiteDomain: 'https://web-tatia.onrender.com/',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter, {
          P2000: HttpStatus.BAD_REQUEST,
          P2025: HttpStatus.NOT_FOUND,
        });
      },
      inject: [HttpAdapterHost],
    },
  ],
})
export class AppModule {}
