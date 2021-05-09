import jwt from 'jsonwebtoken'
import connectDB from '../../scripts/mongodb'
import UserModel from '../../scripts/schemas/User'

import {serialize} from 'cookie'
import {validateEmail} from '../../scripts/validate'

const handler = async (req, res) =>{

    const body = req.body

    if (!body.email || !validateEmail(body?.email)){ return res.status(400).send('Invalid Email')}

    const currentUser = UserModel.findOne({email: body.email})

    if (!currentUser) { return res.status(400).send()}

    bcrypt.compare(body.password, currentUser.password, async function(err, result){
      if (err || !result){
          return res.status(401).send()
      }

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