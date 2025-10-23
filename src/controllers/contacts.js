import {getAllContacts, getContactById, createContact, deleContact, upserContact} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export async function allContactsController(req, res){
    const {page, perPage} = parsePaginationParams(req.query);
    const {sortBy, sortOrder} = parseSortParams(req.query);

    const contacts = await getAllContacts(page, perPage, sortBy, sortOrder);




    res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts
    })
}


export async function contactByIdController(req, res, next) {

    const {contactId} = req.params;
    const contact = await getContactById(contactId);

    if(!contact){
        next(createHttpError(404, 'Contact not found'));
    }
    res.status(200).json({
        status: 200,
        message:`Successfully found contact with id ${contactId}!`,
        data: {
            name: contact.name,
            phoneNumber: contact.phoneNumber,
            isFavourite: contact.isFavourite,
            contactType: contact.contactType,
            email: contact.email,
            },



    })

}

export async function createContactController(req, res){
    const contact = await createContact(req.body)

    res.status(201).json({
        status: 201,
        mesage: "Successfully created a contact!",
        data: contact
    })
}


export async function deleContactController(req, res, next) {
    const {contactId} = req.params;
    const contact =  await deleContact(contactId);


    if(!contact){
        next(createHttpError(404, "Contact not found"))
    }
    res.status(204).send();
}

export async function upsertContactController(req, res, next){
    const {contactId} = req.params;
    const contact = await upserContact(contactId, req.body);

    if(!contact){
        next(createHttpError(404, "Contact not found"))
    }

    if(contact.updatedExisting === true){
        res.status(200).json({
            status: 201,
            message: "Successfully patched a contact!",
            data: contact.value
        })
    }

    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        data: contact.value
    })
}