import mongoose from "mongoose";
import { Password } from "../services/password";

//an interface that describes what it takes to create a user
interface UserAttrs {
    email:string;
    password:string;
}

//an interface that describes the the properties that a User Document has
interface UserDoc extends mongoose.Document{
    email:string;
    password:string;
}

//an interface that describes the proerties that a model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

},{
  //don't  do this, use a normalize function prefererably
  toJSON:{
    transform(doc, ret){
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

userSchema.pre('save', async function(done){
  if(this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
})

//note this is how we add new custom function to a schema
userSchema.statics.build = (attrs:UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };