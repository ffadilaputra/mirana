const Item = require('./itemModel')

module.exports = {
    index: (req, res) => {
        Item.find(function(err, item) {
            if (err) res.send(err)
            res.status(200).json(item)
        })
    },
    findById: (req, res) => {
        Item.findById({ _id: req.params.id }, function(err, item) {
            if (err) res.send(err)
            res.status(200).json(item)
        })
    },
    store: (req, res) => {
        let item = new Item()
        item.name = req.body.name
        item.desc = req.body.desc
        item.save(function(err) {
            if (err) res.send(err)
            res.status(200).json({
                message: 'Item Created',
                SUCCESS: item,
            })
        })
    },
    update: (req, res) => {
        Item.findById({ _id: req.params.id }, function(err, item) {
            if (err) res.send(err)
            item.name = req.body.name
            item.desc = req.body.desc
            item.save(function(err) {
                if (err) res.send(err)
                res.status(200).json({
                    UPDATED: item,
                    message: 'Update successfully'
                })
            })
        })
    },
    delete: (req, res) => {
        Item.deleteOne(
            {
                _id: req.params.id,
            },
            function(err, item) {
                if (err) res.send(err)
                res.status(200).json({
                    REMOVED: item,
                    message: 'Delete Successfully'
                })
            }
        )
    },
}
