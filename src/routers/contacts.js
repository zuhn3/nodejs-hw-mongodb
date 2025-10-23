import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {allContactsController, contactByIdController, createContactController, deleContactController, upsertContactController} from '../controllers/contacts.js'

const router = Router();


router.get('/contacts', ctrlWrapper(allContactsController));
router.get('/contacts/:contactId', ctrlWrapper(contactByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleContactController))
router.patch('/contacts/:contactId', ctrlWrapper(upsertContactController))
export default router;