const mongoose= require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        validate(value){
       
           if(value<=0){
                throw new Error("Invalid Age!")
            }
        }
    }
})
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject._id
    delete userObject.__v
    return userObject
}
const User = mongoose.model('User', userSchema)

module.exports = User