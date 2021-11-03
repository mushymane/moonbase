const { Model, DataTypes } = require('sequelize');
const { User, Post, Comment, Hype } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('./user-routes');

// adds another hype element, not sure if this works we can check
// api/hype/
router.post('/', withAuth, async (req, res) => {
    try {
        const hypeData = await Hype.create(...req.body);
        res.status(200).json(hypeData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// deletes hype based on hype id api/hype/:id
router.delete('/:id', async (req, res) => {
    try {
        const hypeData = await Hype.destroy({
            where: { id: req.params.id }
        });

        if (!hypeData) {
            res.status(404).json({ message: 'no hype found with this id' })
            return;
        }
        res.status(200).json(hypeData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;