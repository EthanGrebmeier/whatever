import jwt from 'jsonwebtoken'
import RefreshTokenModel from '../../../scripts/schemas/RefreshToken'
import connectDB from '../../../scripts/mongodb'

export const getRefresh = (cookieString) => {
    const cookieList = cookieString.split(/[;= ]+/)
    for (let i = 0; i  < cookieList.length; i++){
        if (cookieList[i] == 'refresh'){
            return cookieList[i+1]
        }
    }
}

async function handler(req, res){
    try{
        const reqRefreshToken = getRefresh(req.headers.cookie)
        if (!reqRefreshToken){return res.status(400).send()}
        const dbToken = await RefreshTokenModel.findOne({refreshToken: reqRefreshToken})
        if (!dbToken){return res.status(401).send()}
        jwt.verify(reqRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {return res.status(403).send()}
            const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
            return res.json({
                accessToken: accessToken
            })
        })
    } catch (e){
        console.log(e)
        res.status(400).send()
    }
}

export default connectDB(handler)