const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const { expressjwt: jwt } = require('express-jwt');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todo-app', {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', jwt({ secret: 'your_jwt_secret', algorithms: ['HS256'] }), taskRoutes);

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Schedule job for sending reminders
const Task = require('./models/Task'); // Upewnij się, że importujesz model Task

const sendReminderEmails = async () => {
  try {
    const tasks = await Task.find({
      dueDate: { $lt: new Date(new Date().getTime() + 24*60*60*1000) }, 
      status: false 
    }).populate('user');

    tasks.forEach(task => {
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: task.user.email, // Zakładamy, że użytkownik ma pole email
        subject: 'Task Reminder',
        text: `This is a reminder for your task: ${task.title}. Due date: ${task.dueDate}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent: ' + info.response);
      });
    });
  } catch (error) {
    console.error('Error sending reminder emails:', error);
  }
};

// Schedule the job to run at 8 AM every day
schedule.scheduleJob('0 8 * * *', sendReminderEmails);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
