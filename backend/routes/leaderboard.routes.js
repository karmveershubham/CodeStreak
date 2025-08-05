import express from 'express';
const router = express.Router();
import User from '../models/User.js'; // Ensure the User model is correct

// GET /api/leaderboard?page=1&limit=10
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const users = await User.find({})
      .sort({ overallScore: -1 }) // sort by score descending
      .skip((page - 1) * limit)
      .limit(limit);

    let entries = users.map((user, index) => ({
      rank: (page - 1) * limit + index + 1,
      username: user.name, // change to `user.username` if it exists
      overallScore: user.overallScore || 0,
    }));

    // ✅ Add fallback after mapping
    if (entries.length === 0) {
      entries = [
        { rank: 1, username: 'ruhi', overallScore: 1200 },
        { rank: 2, username: 'rita', overallScore: 1100 },
        { rank: 3, username: 'sita', overallScore: 1050 },
      ];
    }

    res.json({ entries });
  } catch (err) {
    console.error('Leaderboard fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
});

export default router;
