import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, select: false, unique: true },
  password: { type: String, required: true, select: false },
});

//InferSchmaType is mongoose utitlity type to get the type of a mode form a schema
type User = InferSchemaType<typeof userSchema>;

export default model<User>("user", userSchema);
