import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  avatar : {
    type : String,
    default : "https://s.yimg.com/fz/api/res/1.2/tz6nAVv_EpaPcs21sOCmqQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD05Njt3PTk2/https://tse4.mm.bing.net/th?q=Profile+Logo+PNG&pid=Api&mkt=en-US&cc=US&setlang=en&adlt=strict&t=1"
  }
})

const User = mongoose.model('User',userSchema);
export default User;