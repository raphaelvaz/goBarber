//pra funfar bem o decorator
import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import rateLimiter from '../http/middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
//acessar de forma statatic significa acessar exatamente o conteúdo da pasta
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    //erro conhecido, originado pela própria aplicação
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
})

app.listen(3333, () => {
    console.log('🎈🎈 Server started on port 3333!')
});
