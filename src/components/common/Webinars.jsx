import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const Webinars = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await axios.get("/api/webinars");
        // Ensure we always get an array, even if the response is null/undefined
        const data = response?.data ?? [];
        setWebinars(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching webinars:", err);
        setError(err.message || "Failed to load webinars");
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto flex flex-col items-center">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Loading Webinars...
        </Typography>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Upcoming Webinars
        </Typography>
        <Alert severity="error" className="mt-4">
          {error}
        </Alert>
      </div>
    );
  }

  // Safely check if webinars is an array before mapping
  const webinarItems = Array.isArray(webinars) ? webinars : [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Upcoming Webinars
      </Typography>

      {webinarItems.length === 0 ? (
        <Typography variant="body1" className="mt-4">
          No upcoming webinars scheduled. Check back later!
        </Typography>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webinarItems.map((webinar) => (
            <motion.div key={webinar.id} whileHover={{ scale: 1.05 }}>
              <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {webinar.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {webinar.description}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    📅 {webinar.date} | 🕒 {webinar.time}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary" fullWidth>
                    Register
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Webinars;