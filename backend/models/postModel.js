import mongoose from "mongoose";
import slugify from "slugify";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    slug: { type: String },
  },
  {
    timestamps: true,
  }
);

// slugifying title before save
postSchema.pre("save", function (next) {
  const post = this;
  post.slug = slugify(post.title, {
    lower: true,
    strict: true,
  });
  next();
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
