import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // Store contact message
      const contact = await storage.saveContactMessage({
        name,
        email,
        subject,
        message,
        date: new Date().toISOString()
      });
      
      res.status(200).json({ message: 'Message sent successfully', id: contact.id });
    } catch (error) {
      console.error('Error saving contact message:', error);
      res.status(500).json({ message: 'Failed to send message' });
    }
  });

  // API route for resume download
  app.get('/api/download-resume', (req, res) => {
    try {
      const resumePath = path.resolve(process.cwd(), 'attached_assets/Resume_Dhananjay_Dadheech.pdf');
      
      if (fs.existsSync(resumePath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Resume_Dhananjay_Dadheech.pdf');
        
        const fileStream = fs.createReadStream(resumePath);
        fileStream.pipe(res);
      } else {
        res.status(404).json({ message: 'Resume file not found' });
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      res.status(500).json({ message: 'Failed to download resume' });
    }
  });

  const httpServer = createServer(app);
  
  return httpServer;
}
