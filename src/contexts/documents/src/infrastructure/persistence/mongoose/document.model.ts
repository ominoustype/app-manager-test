import { Schema } from "mongoose"

const model = new Schema({
    name: {
        type: Schema.Types.String,
    }
})


export default model;