import Session from "../models/session.js";

const verifySession = async (req, res, next) => {
  try {
    const sessionToken = req.headers["x-session-token"];

    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: "Session token is missing"
      });
    }

    // Find session from DB
    const session = await Session.findOne({ sessionToken });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Invalid session"
      });
    }

    // ✅ Check expiry using expiresAt
    const now = new Date();

    if (now > new Date(session.expiresAt)) {
      return res.status(401).json({
        success: false,
        message: "Your session expired"
      });
    }

    // ✅ Update last activity
    session.lastActivity = new Date();
    await session.save();

    // ✅ Attach data to req for next controller
    req.session = session;
    req.tableNumber = session.tableNumber;

    next();

  } catch (error) {
    next(error);
  }
};

export default verifySession;
