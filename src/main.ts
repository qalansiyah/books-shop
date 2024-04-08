import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import logger from './logger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Книжный магазин')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Books shop')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.use(
    (
      req: { url: string },
      res: { redirect: (arg0: string) => void },
      next: () => void,
    ) => {
      if (req.url === '/') {
        res.redirect('/api/docs');
      } else {
        next();
      }
    },
  );
  app.use((req: { method: any; url: any }, res: any, next: () => void) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
