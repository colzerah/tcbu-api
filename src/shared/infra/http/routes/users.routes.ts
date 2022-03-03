import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { DeleteUserController } from '@modules/accounts/useCases/deleteUser/DeleteUserController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { UpdateAvatarController } from '@modules/accounts/useCases/updateAvatar/UpdateAvatarController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';
import { Router } from 'express';
import multer from 'multer';

const usersRoutes = Router();
const uploadPhoto = multer(uploadConfig.upload('./tmp/photo'));

const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();
const listUserController = new ListUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/:page', listUserController.handle);
usersRoutes.delete('/', deleteUserController.handle);
usersRoutes.patch('/', updateUserController.handle);
usersRoutes.patch(
  '/:id',
  uploadPhoto.single('photo'),
  updateAvatarController.handle
);

export { usersRoutes };
