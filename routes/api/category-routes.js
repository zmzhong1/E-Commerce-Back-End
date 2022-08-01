const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  await Category.findAll({
    // be sure to include its associated Products
    include: [{
      model: Product
    }]
  }).then(categoryData => {
    if (!categoryData) {
      return res.status(404).json({
        msg: "this category id does not exist"
      })
    }
    res.json(categoryData)
  }).catch(err => {
    res.status(500).json({ msg: "error finding categories", err })
  })
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: {
        model: Product
      }
    })
    if (!categoryId) {
      return res.status(404).json({
        msg: "this category id does not exist"
      })
    }
    res.json(categoryId)
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    })
    res.status(201).json(newCategory)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    id: req.body.id,
    category_name: req.body.category_name
  },
    {
      where: {
        id: req.params.id
      }
    }).then(categoryUpdate => {
      if (!categoryUpdate[0]) {
        return res.status(404).json({ msg: "no such category or no change made!" })
      }
      res.json(categoryUpdate)
    }).catch(err => {
      res.status(500).json({
        msg: "internal server error",
        err
      })
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(categoryDel => {
    if (!categoryDel) {
      return res.status(404).json({ msg: "no such category" })
    }
    res.json(categoryDel)
  }).catch(err => {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  })
});

module.exports = router;
