import jwt from 'jsonwebtoken'
import connectDB from '../../scripts/mongodb'
import RefreshTokenModel from '../../scripts/schemas/RefreshToken'
import UserModel from '../../scripts/schemas/User'
import bcrypt from 'bcrypt'
import {serialize} from 'cookie'
import {validateEmail, validatePassword} from '../../scripts/validate'
import runMiddleware from '../../scripts/runMiddleware'


const apiLimiter = rateLimit({
  max: 5,
  windowMs: 10 * 60 * 1000, // 10 Minutes
  message: 'Please try again in a few minutes'
})

const handler = async (req, res) =>{

  

  const body = req.body

  if (!body.firstName){ return res.status(400).send('First name is required')}
  if (!body.firstName || body.firstName.length > 12){ return res.status(400).send('First name too long')}
  if (!body.lastName){ return res.status(400).send('Last name is required')}
  if (!body.lastName || body.firstName.length > 12){ return res.status(400).send('Last name too long')}
  if (!body.email || !validateEmail(body?.email)){ return res.status(400).send('Invalid email')}
  if (!body.password || !validatePassword(body?.password)){ return res.status(400).send('Passwords must be at least 6 characters long and have a capital letter and a number')}

  const currentUser = await UserModel.findOne({email: body.email})

  if (currentUser) { return res.status(400).send('User already exists')}

  await runMiddleware(req, res, apiLimiter)

  bcrypt.hash(body.password, 10, async function(err, hash){
    const user = await UserModel.create(
      {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email.toLowerCase(),
        password: hash,
        settings: body.settings,
        layoutMeta: {
          defaultLayout: body.layoutMeta.defaultLayout,
          layouts: body.layoutMeta.layouts
        }
      } 
    )

    const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2w'})

    await RefreshTokenModel.create({refreshToken: refreshToken})
    res.setHeader('Set-Cookie', serialize('refresh', refreshToken, {path: '/', maxAge: 1209600000}))

    res.json({
      accessToken: accessToken
    })
    
  })
}   

export default connectDB(handler)