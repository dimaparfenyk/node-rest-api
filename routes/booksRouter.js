const express = require("express");
const Joi = require("joi");

const books = require("../services/booksServices.js");
const { HttpError } = require("../helpers");

const router = express.Router();

// схема объекта который ожидаем получить в req.body
const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await books.getAll();
    res.json(result);
  } catch (error) {
    next(error); // перенаправит на мидлвару обработки ошибок в app.js
    // res.status(500).json({
    //   message: "Server error",
    // });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await books.getById(id);

    if (!result) {
      throw HttpError(404, "Not found"); // ф-ция возвращает ошибку которая с помощью throw будет проброшена в catch
      //   const error = new Error("Not found");
      //   error.status = 404;
      //   throw error;

      //   return res.status(404)
      // .json({ message: "Not Found" });
    }

    res.json(result);
  } catch (error) {
    next(error); // перенаправит на мидлвару обработки ошибок в app.js
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({ message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    // console.log(req.body); // тело запроса находится в req.body

    const { error } = addSchema.validate(req.body); // проверяем req.body на соответствие со схемой ожидаемого объекта ответа
    if (error) {
      // если req.body не соответствует схеме выбрасываем ошибку
      throw HttpError(400, error.message);
    }

    const result = await books.add(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await books.updateById(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await books.deleteById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    // res.status(204).send()
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
