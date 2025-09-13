import { UserRole } from "@riderota/utils";
import { Resend } from "resend";

const resend = new Resend("re_xxxxxxxxx");

// (async function () {
//   const { data, error } = await resend.emails.send({
//     from: "Acme <onboarding@resend.dev>",
//     to: ["delivered@resend.dev"],
//     subject: "Hello World",
//     html: "<strong>It works!</strong>",
//   });

//   if (error) {
//     return console.error({ error });
//   }

//   console.log({ data });
// })();

const sendInvite = async (
  from: string,
  to: string,
  userType: UserRole,
  tenantName: string,
  inviteLink: string,
  welcomeMessage?: string
) => {
  try {
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
