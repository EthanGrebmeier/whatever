import connectDB from '../../scripts/mongodb'
import RefreshTokenModel from '../../scripts/schemas/RefreshToken'
import { getRefresh } from './tokens/refreshToken'
import { serialize } from 'cookie'

const handler = async (req, res) =>{
    const reqRefreshToken = getRefresh(req.headers.cookie)
    await RefreshTokenModel.findOneAndDelete({refreshToken: reqRefreshToken})
    res.setHeader('Set-Cookie', serialize('refresh', '', {path: '/', maxAge: 0}))
    return res.status(200).send()
}   

export default connectDB(handler)