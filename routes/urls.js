import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import { validateUrl } from '../utils/utils.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });

const router = express.Router();

// localhost:3333/api/short
router.post('/short', async (req, res) => {
  const { origUrl } = req.body;
  const base = process.env.BASE;

  const urlId = nanoid(4);
  if(validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ urlId });

      if(url){
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        // New Entity
        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original URL');
  }
});

export default router;