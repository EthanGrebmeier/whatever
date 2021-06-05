import jwt from 'jsonwebtoken'
import connectDB from '../../scripts/mongodb'
import UserModel from '../../scripts/schemas/User'
import RefreshTokenModel from '../../scripts/schemas/RefreshToken'
import bcrypt from 'bcrypt'

import {serialize} from 'cookie'
import {validateEmail} from '../../scripts/validate'

const handler = async (req, res) =>{

    const body = req.body

    if (!body.email || !validateEmail(body?.email)){ return res.status(400).send({message:'Invalid Email'})}

    const currentUser = await UserModel.findOne({email: body.email})

    if (!currentUser) { return res.status(400).json({message: 'User Not Found'})}

    bcrypt.compare(body.password, currentUser.password, async function(err, result){
      if (err || !result){
          return res.status(400).send({message:'Incorrect Password'})
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