//pra funfar bem o decorator
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';

import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
//acessar de forma statatic significa acessar exatamente o conteúdo da pasta
app.use('/files', express.static(uploadConfig.diretory));
app.use(routes);

app.use(( err: Error, request: Request, response: Response, next:NextFunction ) => {
    //erro conhecido, originado pela própria aplicação
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status:'error',
        message:'Internal server error',
    })
})

app.listen(3333, () => {
    console.log('🎈🎈 Server started on port 3333!')
});
