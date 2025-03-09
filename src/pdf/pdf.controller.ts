/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Query } from '@nestjs/common';
import { PdfService } from './pdf.service';

@Controller('/pdf')
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @Get('')
  public getPdfFile(@Query('cpf') cpf: string) {
    console.log(cpf);
    return this.pdfService.listarArquivosPdf(cpf);
  }
}
