const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html: options.html,
    text: options.text
  };

  // 3) Send the email
  await transporter.sendMail(mailOptions);
};

const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to NoteGenius!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4f46e5;">Welcome to NoteGenius!</h2>
      <p>Hi ${user.name},</p>
      <p>Thank you for registering with NoteGenius. Your account has been successfully created.</p>
      <p>You can now log in and start using our AI-powered note summarization tools.</p>
      <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
      <p>Best regards,</p>
      <p>The NoteGenius Team</p>
    </div>
  `;
  const text = `Welcome to NoteGenius!\n\nHi ${user.name},\n\nThank you for registering with NoteGenius. Your account has been successfully created.\n\nYou can now log in and start using our AI-powered note summarization tools.\n\nIf you have any questions or need assistance, please don't hesitate to contact our support team.\n\nBest regards,\nThe NoteGenius Team`;

  await sendEmail({
    email: user.email,
    subject,
    html,
    text
  });
};

const sendPasswordChangeEmail = async (user) => {
  const subject = 'Password Changed - NoteGenius';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4f46e5;">Password Changed</h2>
      <p>Hi ${user.name},</p>
      <p>Your password has been successfully changed.</p>
      <p>If you did not make this change, please contact our support team immediately.</p>
      <p>Best regards,</p>
      <p>The NoteGenius Team</p>
    </div>
  `;
  const text = `Password Changed\n\nHi ${user.name},\n\nYour password has been successfully changed.\n\nIf you did not make this change, please contact our support team immediately.\n\nBest regards,\nThe NoteGenius Team`;

  await sendEmail({
    email: user.email,
    subject,
    html,
    text
  });
};

const sendCollaborationEmail = async (collaborator, owner, note, permission) => {
  const permissionText = {
    'view': 'view',
    'comment': 'view and comment on',
    'edit': 'view and edit'
  };
  
  const subject = `You've been added as a collaborator on "${note.title}" - NoteGenius`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4f46e5;">You've been added as a collaborator</h2>
      <p>Hi ${collaborator.name},</p>
      <p>${owner.name} has added you as a collaborator on their note "${note.title}".</p>
      <p>You now have permission to ${permissionText[permission]} this note.</p>
      <p>You can access this note by logging into your NoteGenius account and checking the "Shared with me" section.</p>
      <p>Best regards,</p>
      <p>The NoteGenius Team</p>
    </div>
  `;
  const text = `You've been added as a collaborator\n\nHi ${collaborator.name},\n\n${owner.name} has added you as a collaborator on their note "${note.title}".\n\nYou now have permission to ${permissionText[permission]} this note.\n\nYou can access this note by logging into your NoteGenius account and checking the "Shared with me" section.\n\nBest regards,\nThe NoteGenius Team`;

  await sendEmail({
    email: collaborator.email,
    subject,
    html,
    text
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordChangeEmail,
  sendCollaborationEmail
};