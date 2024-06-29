const mongoose = require("mongoose");

const scholarshipSchema = mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      trim:true
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    nationality:{
      type:Boolean,
      required:true
    },
    description:{
      type:String,
      required:true,
    },
    course:{
      type:String,
      required:true,
    },
    gender:{
      type:String,
      required:true,
    },
    deadline:{
      type:Date,
      required:true,
    }
  },
  { timestamps: true }
);

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);
module.exports = Scholarship;