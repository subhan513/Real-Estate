import jwt from "jsonwebtoken";

export const VerifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    
    if (!token) {
      return res.status(401).json({ 
        message: "Authentication required", 
        success: false 
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ 
            message: "Token expired", 
            success: false 
          });
        }
        return res.status(403).json({ 
          message: "Invalid token", 
          success: false 
        });
      }
      
      req.user = user;
      next();
    });
    
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ 
      message: "Internal server error", 
      success: false 
    });
  }
};