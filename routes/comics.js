const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/comics", async (req, res) => {
  try {
    let title = "";
    let skip = 0;
    let limit = 100;
    if (req.query.title) {
      title = req.query.title;
    }
    if (req.query.skip) {
      skip = req.query.skip;
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&skip=${skip}&limit=${limit}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
