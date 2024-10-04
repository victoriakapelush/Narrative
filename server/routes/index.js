var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/all", upload.single("image"), async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      image: req.file.filename,
      description: req.body.description,
      text: req.body.text,
    });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body)
    .then((post) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" }),
    );
});

router.delete("/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((post) => res.json({ mgs: "Post deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a post" }));
});

module.exports = router;
