import nodemailer from 'nodemailer';
import * as dotEnv from 'dotenv';
dotEnv.config({ path: '.env'});

const getTransporter = async () => {
  const transporter = await nodemailer.createTransport({
    host: process.env.API_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.API_EMAIL,
      pass: process.env.API_PASS,
    }
  });

  return transporter;
};

const mailer = async ({ address, count, date, phone }) => {
  const style = "color: gray; margin-right: 20px; font-size: 12px;";
  const message = {
    from: 'Заявка <waters_service@bk.ru>',
    to: 'krowen@mail.ru',
    subject: 'Заказ воды с сайта',
    html: `<h2>Данные клиента:</h2>
      <p><span style=${style}>Адрес:</span> <strong>${address}</strong></p>
      <p><span style=${style}>Количество:</span> <strong>${count}</strong></p>
      <p><span style=${style}>Дата:</span> <strong>${date}</strong></p>
      <p><span style=${style}>Телефон:</span> <strong>${phone}</strong></p>
    `
  }

  const transporter = await getTransporter();
  
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log('Error', error.message);
      return process.exit(1);
    }
    console.log('INfo', info);
    transporter.close();
  });
};

export default mailer;