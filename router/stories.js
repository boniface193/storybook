const express = require('express')
const { ensureAuth } = require('../middleware/auth')

const router = express.Router()

const Story = require('../models/Story')

router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

router.post('/story', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        res.render('error/500')
        console.log(error)
    }
})

router.get('/public', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' }).populate('user').sort({ createdAt: 'desc' }).lean()
        res.render('stories/index', {
            stories,
        })
    } catch (error) {
        res.render('error/500')
        console.log(error)
    }
})

router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.findOne({ _id: req.params.id }).lean()

        if (!story) {
            return res.render('error/404')
        }
        if (story.user != req.user.id) {
            res.redirect('/public')
        } else {
            res.render('stories/edit', {
                story
            })

        }
    } catch (error) {
        res.render('error/500')
        console.log(error)
    }
})

router.put('/story/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById({ _id: req.params.id }).lean()

        if (!story) {
            return res.render('error/404')
        }
        if (story.user != req.user.id) {
            res.redirect('/public')
        } else {

            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            res.redirect('/dashboard')
        }
    } catch (error) {
        res.render('error/500')
        console.log(error)
    }
})

router.delete('/story/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.remove({ _id: req.params.id }).lean()

        if (!story) {
            return res.render('error/404')
        }
        if (story.user != req.user.id) {
            res.redirect('/dashboard')
        }
    } catch (error) {
        res.render('error/500')
        console.log(error)
    }
})

router.get('/story/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.findOne({ _id: req.params.id }).populate('user').lean()

        if (!story) {
            return res.render('error/404')
        }

        res.render('stories/show', {
            story
        })
    } catch (error) {
        res.render('error/500')
        console.log(error)
    }
})

router.get('/story/user/:userId', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.params.userId, status: 'public' }).populate('user').lean()
console.log(stories)
        if (!stories) {
            return res.render('error/404')
        }

        res.render('stories/index', {
            stories
        })
    } catch (error) {
        res.render('error/500')
        console.log(error)
    }
})

module.exports = router