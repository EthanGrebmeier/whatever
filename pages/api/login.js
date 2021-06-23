import jwt from 'jsonwebtoken'
import connectDB from '../../scripts/mongodb'
import UserModel from '../../scripts/schemas/User'
import RefreshTokenModel from '../../scripts/schemas/RefreshToken'
import bcrypt from 'bcrypt'

import {serialize} from 'cookie'
import {validateEmail} from '../../scripts/validate'
import rateLimit from 'express-rate-limit'
import runMiddleware from '../../scripts/runMiddleware'

const apiLimiter = rateLimit({
  max: 5,
  windowMs: 10 * 60 * 1000, // 10 Minutes
  message: 'Please try again in a few minutes'
})


const handler = async (req, res) =>{

  await runMiddleware(req, res, apiLimiter)

  const body = req.body

  if (!body.email || !validateEmail(body?.email)){ return res.status(400).send('Invalid Email')}

  const currentUser = await UserModel.findOne({email: body.email.toLowerCase()})

  if (!currentUser) { return res.status(400).send('User Not Found')}

  bcrypt.compare(body.password, currentUser.password, async function(err, result){
    if (err || !result){
        return res.status(400).send('Incorrect Password')
    }

    const accessToken = jwt.sign({id: currentUser._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign({id: currentUser._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2w'})

    await RefreshTokenModel.create({refreshToken: refreshToken})
    res.setHeader('Set-Cookie', serialize('refresh', refreshToken, {path: '/', maxAge: 1209600000}))

    return res.json({
      accessToken: accessToken
    })
    
  })    
}   

export default connectDB(handler)