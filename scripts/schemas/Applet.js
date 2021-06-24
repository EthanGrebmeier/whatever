const mongoose = require('mongoose')

const AppletSchema = new mongoose.Schema({
    name: String,
    id: String,
    height: String,
    width: String,
    position: String,
    background: String,
})


export default AppletSchema