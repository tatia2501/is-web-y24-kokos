import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OrderReturnDto } from './order.returnDto';
import { OrderDto } from './order.orderDto';
import { OrderService } from './order.service';
import { Session } from '../auth/session.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { SessionClaimValidator } from 'supertokens-node/lib/build/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get(':order_id')
  @ApiOkResponse({ description: 'Order is showed', type: OrderReturnDto })
  @ApiNotFoundResponse({ description: 'There is nothing yet' })
  async findOrder(
    @Param('order_id', ParseUUIDPipe) order_id: string,
  ): Promise<OrderReturnDto> {
    return this.orderService.findOrder(order_id);
  }
  @Get('')
  @ApiOkResponse({ description: 'Orders are showed', type: [OrderReturnDto] })
  @ApiNotFoundResponse({ description: 'There is nothing yet' })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('customer'),
      ],
    }),
  )
  @ApiCookieAuth()
  async findAll(@Session() session): Promise<OrderReturnDto[]> {
    return this.orderService.findAll(session.userId);
  }
  @Post('')
  @ApiCreatedResponse({
    description: 'Order has been created',
    type: OrderReturnDto,
  })
  @ApiForbiddenResponse({ description: 'Order can not be created' })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('customer'),
      ],
    }),
  )
  @ApiCookieAuth()
  async addToOrder(
    @Session() session,
    @Body() order: OrderDto,
  ): Promise<OrderReturnDto> {
    return this.orderService.addToOrder(session.userId, order);
  }
  @Put(':order_id')
  @ApiOkResponse({
    description: 'Order has been changed',
    type: OrderReturnDto,
  })
  @ApiForbiddenResponse({ description: 'Impossible to change this order' })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('manager'),
      ],
    }),
  )
  @ApiCookieAuth()
  async changeOrder(
    @Param('order_id', ParseUUIDPipe) order_id: string,
    @Body() order: OrderDto,
  ): Promise<OrderReturnDto> {
    return this.orderService.changeOrder(order_id, order);
  }
}
