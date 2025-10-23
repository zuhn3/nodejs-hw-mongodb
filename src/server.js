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
        message: 'OK',
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
          status: 404,
          message: 'Contact not found',
          data: null,
        });
      }

      res.json({
        status: 200,
        message: 'OK',
        data: contact,
      });
    } catch (err) {
      next(err);
    }
  });

  
  app.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Route not found',
      data: null,
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