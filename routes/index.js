import express from 'express';
import Url from '../models/Url.js';
const router = express.Router();

// localhost:3333/urlId
router.get('/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });

    if (url){
      await Url.updateOne(
        { urlId: req.params.urlId },
        { $inc: { clicks: 1 } } // Increment
      );
      return res.redirect(url.origUrl);
    } else { res.status(400).json('Not Found'); }
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
});

export default router;