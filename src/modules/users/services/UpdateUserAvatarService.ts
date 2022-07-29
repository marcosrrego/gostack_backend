/* eslint-disable camelcase */
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,

    ) {}

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only aythenticated users can change avatar.',
                401,
            );
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }

        const fileName = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = fileName;

        await this.usersRepository.save(user);
        // SAVE ele serve para criar, salvar ou atualizar o usuario; primeiro ele vai ver se o usuario existe no (user.avatar) e ve se tem o ID, se não tiver ID ele cria o usuário, se o usuario já tiver ID, ele só vai atualizar.

        return user;
    }
}

export default UpdateUserAvatarService;
