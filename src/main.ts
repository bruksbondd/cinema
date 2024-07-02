import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 

  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('Cinema')
  .setDescription('The Cinema API description')
  .setBasePath('api')
  .setVersion('1.0')
  .addBearerAuth(undefined, 'defaultBearerAuth')
  .build();

  const options = {
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: 'defaultBearerAuth',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNseTQ3anFsbTAwMDBnMm51bzZ6cXlvdDciLCJpYXQiOjE3MTk5MTI1ODgsImV4cCI6MTcxOTkxNjE4OH0.F12Ar_E6Pae2Z1xBw8okgISEF6fLmN4vY2PCC4bXZmU',
        },
      },
    },
  };


const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document, options);


  await app.listen(3000);
}
bootstrap();
