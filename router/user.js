const express = require("express");
const fetch = require("node-fetch");
const { Op } = require("sequelize");

const router = express.Router();
const externalApiUrl = "https://randomuser.me/api/?results=50";

const User = require("../model/user"); // Make sure to import your User model

router.get("/fetch-users", async (req, res) => {
  try {
    const response = await fetch(externalApiUrl);
    const data = await response.json();
    const usersData = data.results.map((el) => ({
      first_name: el.name.first,
      last_name: el.name.last,
      user_name: el.login.username,
      age: el.dob.age,
      email: el.email,
      phone: el.phone,
      picture: el.picture.thumbnail,
    }));
    await User.bulkCreate(usersData);
    res.status(200).send("Users fetched and saved successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete-users", async (req, res) => {
  try {
    const deletedRows = await User.destroy({ where: {} });
    if (deletedRows > 0) {
      res.status(200).send({ msg: "All users deleted successfully." });
    } else {
      res.status(404).send({ msg: "No users found to delete." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/read-users", async (req, res) => {
  try {
    const pageSize = 10;
    const pageNum = parseInt(req.query.page) || 1;
    const offset = (pageNum - 1) * pageSize;
    const { rows: data, count } = await User.findAndCountAll({
      limit: pageSize,
      offset: offset,
    });
    res.status(200).send({ data, page_num: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/search-users", async (req, res) => {
  try {
    const { username, sort } = req.query;

    if (username) {
      const searchData = await User.findAll({
        where: {
          user_name: {
            [Op.like]: `%${username}%`,
          },
        },
      });
      res.status(200).send({ data: searchData });
    } else if (sort) {
      const sortedData = await User.findAll({
        order: [["first_name", sort]],
      });
      res.status(200).send({ data: sortedData });
    } else {
      res.status(400).send({ msg: "Invalid query parameters." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
