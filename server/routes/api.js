const express = require('express')


const router = new express.Router()

router.get('/dashboard', (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: `You (${JSON.stringify(req.user)}) are authorized to see this secret message.`
    })

  } else {
    res.sendStatus(401)
  }
})


module.exports = router
