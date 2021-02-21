const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  try {
    let name = "";
    let skip = 0;
    let limit = 100;
    if (req.query.name) {
      name = req.query.name;
    }
    if (req.query.skip) {
      skip = req.query.skip;
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
