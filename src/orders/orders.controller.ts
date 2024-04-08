import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order } from './entities/orders.entity';
import { OrderDto } from './dto/order.dto';
import logger from 'src/logger';

@ApiTags('Заказы')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @ApiOperation({ summary: 'Создать заказ' })
  @ApiResponse({ status: 201, type: Order })
  @UsePipes(ValidationPipe)
  @Post()
  async createOrder(
    @Body() dto: OrderDto,
  ): Promise<{ order: Order; message: string }> {
    try {
      const order = await this.orderService.add(dto);
      return {
        order,
        message: `Ваш заказ ${order.orderNumber} добавлен в корзину`,
      };
    } catch (error) {
      logger.error(`Ошибка при создании заказа: ${error.message}`);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Поиск заказа' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('/:orderNumber')
  async findOrder(@Param('orderNumber') orderNumber: string) {
    try {
      const order = await this.orderService.findOrder(orderNumber);
      return order;
    } catch (error) {
      logger.error(`Заказ не найден: ${error.message}`);
      throw error;
    }
  }
}
