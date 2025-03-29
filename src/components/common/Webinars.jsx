import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const Webinars = () => {
  const [webinars, setWebinars] = useState([]);

  useEffect(() => {
    axios.get("/api/webinars")
      .then(response => setWebinars(response.data))
      .catch(error => console.error("Error fetching webinars:", error));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Upcoming Webinars
      </Typography>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webinars.map((webinar) => (
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
    </div>
  );
};

export default Webinars;
