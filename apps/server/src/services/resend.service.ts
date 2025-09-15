import { UserRole } from "@riderota/utils";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const sendInvite = async (
  from: string,
  to: string,
  userType: UserRole,
  tenantName: string,
  inviteLink: string,
  welcomeMessage?: string
) => {
  try {
    console.log("Sending invite to:", to);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: `You're Invited to Join ${tenantName}!`,
      html: `<strong>Dear future ${userType}!\n\n${
        welcomeMessage || `You've been invited to join ${tenantName}.`
      }</strong> <a href="${inviteLink}">${inviteLink}</a>`,
    });

    if (error) {
      throw error;
    }

    console.log({ emailSendingResponse: data });
  } catch (error) {
    console.error("Error sending invite:", error);
    throw error;
  }
};

export { sendInvite };
