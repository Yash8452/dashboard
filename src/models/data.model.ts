import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

// Defining Mongoose model

export default mongoose.models.Data || mongoose.model("Data", dataSchema);
