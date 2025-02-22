import { notaria15Api } from "../../api/notaria.api";
import { EmailData } from "../../interfaces/Email.interface";


export const sendEmail = async (emailData: EmailData) => {
  try {
    const response = await notaria15Api.post("/mail/send-email", emailData);
    return response.data;
  } catch (error) {
    console.error("Error enviando el correo:", error);
    return;
  }
};
