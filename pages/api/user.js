import jwt from 'jsonwebtoken'
import connectDB from '../../scripts/mongodb'
import UserModel from '../../scripts/schemas/User'
import RefreshTokenModel from '../../scripts/schemas/RefreshToken'

const handler = async (req, res) =>{

    const authHeader = req.headers['authorization']
    const reqAccessToken = authHeader && authHeader.split(' ')[1]

    if (reqAccessToken == null){return res.sendStatus(401)}

    jwt.verify(reqAccessToken, process.env.ACCESS_TOKEN_SECRET, async (err, userObj) => {
        console.log(err)
        if (err) {return res.status(403).send()}
        req.userId = userObj.id
        const user = await UserModel.findById(req.userId).lean()
        console.log(user)
        return res.json(user)
    })
}   

export default connectDB(handler)