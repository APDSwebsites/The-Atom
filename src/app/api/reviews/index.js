import dbConnect from "@/lib/mongodb";
import Review from "@/models/Review";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const review = await Review.create(req.body);
        res.status(201).json({ success: true, data: review });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
