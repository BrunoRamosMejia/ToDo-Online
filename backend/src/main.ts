import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger | Configuracion y Setup
  const swaggerDoc = new DocumentBuilder()
    .setTitle('To-Do Online API | Tareas y Usuarios | Bruno Ramos Mejia')
    .setDescription('Arquitectura Backend de la App "To-Do Online" Para el manejo de la base de datos y el funcionamiento y endpoints de la App, Proyecto de Portafolio hecho por Bruno Ramos Mejia ♥')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const documentModule = SwaggerModule.createDocument(app, swaggerDoc);
  SwaggerModule.setup('', app, documentModule);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
