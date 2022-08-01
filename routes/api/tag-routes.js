const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [ProductTag, Product]
    })
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id), {
    // be sure to include its associated Product data
    include: [ProductTag, Product]
  }.then(tagId => {
    if (!tagId) {
      return res.status(404).json({
        msg: "this tag id does not exist"
      })
    }
    res.json(tagId)
  }).catch(err => {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  })
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.delete({
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
