import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email:    { type: String, required: true },
    projectTitle: { type: String, required: true },
    status: { type: String, default: "pending" } // optional
  },
  { timestamps: true, collection: "students" } // ensures collection name
);

export default mongoose.model("Student", StudentSchema);
