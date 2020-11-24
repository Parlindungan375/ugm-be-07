import mongoose from 'mongoose';

const complainSchema = mongoose.Schema(
   {
   course: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
}
);

const Complain = mongoose.model('Complain', complainSchema);

export default Complain;