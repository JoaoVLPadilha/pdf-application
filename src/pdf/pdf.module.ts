import { PdfController } from './pdf.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';

@Module({
  imports: [],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
