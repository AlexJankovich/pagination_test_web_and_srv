// import { ApiProperty } from '@nestjs/swagger';
// import { Transform, Type } from 'class-transformer';
// import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ListParamsDto {
  page = 1;
  limit = 20;
}
