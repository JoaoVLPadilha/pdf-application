import { PdfModule } from './pdf/pdf.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    PdfModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
