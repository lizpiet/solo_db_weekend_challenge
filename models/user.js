
//added by Liz - whole page
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema ({
    username: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true }
});



UserSchema.pre('save', function(next){
    var user = this;
    // only hash the password if it has been modified (or it is new)
    if (!user.isModified('password')) return next();

    //generate a salt

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err)
            //{
            return next(err);
         //} else{
        //hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash){
            if (err)
            //{
                return next (err);
         //}else{
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
                //}
             });
        //}
    });
});

//Also create a convenience method for comparing passwords later on

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch);
    })
};

module.exports = mongoose.model('User', UserSchema);