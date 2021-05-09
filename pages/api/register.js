import jwt from 'jsonwebtoken'
import connectDB from '../../scripts/mongodb'
import RefreshTokenModel from '../../scripts/schemas/RefreshToken'
import UserModel from '../../scripts/schemas/User'

import {serialize} from 'cookie'
import {validateEmail, validatePassword} from '../../scripts/validate'


const handler = async (req, res) =>{

    const body = req.body

    if (!body.firstName || body.firstName.length > 12){ return res.status(400).send('First Name Too Long')}
    if (!body.lastName || body.firstName.length > 12){ return res.status(400).send('Last Name Too Long')}
    if (!body.email || !validateEmail(body?.email)){ return res.status(400).send('Invalid Email')}
    if (!body.password || !validatePassword(body?.password)){ return res.status(400).send('Invalid Password')}

    const currentUser = UserModel.findOne({email: body.email})

    if (currentUser) { return res.status(400).send()}

    bcrypt.hash(body.password, 10, async function(err, hash){
      const user = await UserModel.create(
        {
          email: body.email,
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