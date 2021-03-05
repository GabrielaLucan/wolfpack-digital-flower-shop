import mongoose from 'mongoose';

export const extend = (Schema, obj, timestamps = false) => (
    new mongoose.Schema(
        Object.assign({}, Schema.obj, obj),
        { timestamps, versionKey: false }
    )
);