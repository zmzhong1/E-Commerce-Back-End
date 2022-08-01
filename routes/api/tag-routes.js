const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
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

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
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

router.post('/', async (req, res) => {
  // create a new tag
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

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
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

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
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
