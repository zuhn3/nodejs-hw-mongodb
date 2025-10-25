import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Contact } from './models/Contact.js';

export const createServer = () => {
  const app = express();
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  
  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await Contact.find();
      
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',  
        data: contacts,
      });
    } catch (err) {
      next(err);
    }
  });
  
  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await Contact.findById(contactId);
      
      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found',  
        });
      }
      
      res.status(200).json({  
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,  
        data: contact,
      });
    } catch (err) {
      next(err);
    }
  });
  
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',  
    });
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.status === 500 ? 'Something went wrong' : err.message,
      data: err.message,
    });
  });
  
  return app;
};