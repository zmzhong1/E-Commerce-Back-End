const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      // be sure to include its associated Product data
      include: {
        model: Product
      }
    })
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: {
        model: Product
      }
    })
    if (!tagId) {
      return res.status(404).json({
        msg: "this tag id does not exist"
      })
    }
    res.json(tagId)
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }
})

// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(201).json(newTag)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update({
    id: req.body.id,
    tag_name: req.body.tag_name
  },
    {
      where: {
        id: req.params.id
      }
    }).then(tagUpdate => {
      if (!tagUpdate[0]) {
        return res.status(404).json({ msg: "no such tag or no change made!" })
      }
      res.json(tagUpdate)
    }).catch(err => {
      res.status(500).json({
        msg: "internal server error",
        err
      })
    })
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(tagDel => {
    if (!tagDel) {
      return res.status(404).json({ msg: "no such product" })
    }
    res.json(tagDel)
  }).catch(err => {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  })
});

module.exports = router;
