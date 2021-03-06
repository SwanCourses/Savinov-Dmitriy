/**
 * Created by Freem_000 on 10/11/2016.
 */
import { Router } from 'express';
import * as CategoryController from '../controllers/category.controller';

const router = new Router();


router.route('/categories').get(CategoryController.getCategories);
router.post('/categories', CategoryController.addCategory);

export default router;
