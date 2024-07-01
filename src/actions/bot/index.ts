"use server";

import { client } from "@/lib/prisma";
import { extractEmailsFromString, extractURLfromString } from "@/lib/utils";
import { onRealTimeChat } from "../conversation";
import { clerkClient } from "@clerk/nextjs";
import { onMailer } from "../mailer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

console.log(process.env.OPEN_AI_KEY);

export const onGetCurrenthatbot = async (id: string) => {
  try {
    const chatbot = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        helpdesk: true,
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
            icon: true,
            textColor: true,
            background: true,
            helpdesk: true,
          },
        },
      },
    });
    if (chatbot) {
      return chatbot;
    }
  } catch (error) {
    console.log(error);
  }
};
let customerEmail: string | undefined;

export const onStoreConversation = async (
  id: string,
  message: string,
  role: "assistant" | "user"
) => {
  try {
    await client.chatRoom.update({
      where: {
        id,
      },
      data: {
        message: {
          create: {
            message,
            role,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// export const onAichatBotAssistent = async (
//   id: string,
//   chat: { role: "assistant" | "user"; content: string }[],
//   author: "user",
//   message: string
// ) => {
//   try {
//     const chatbotDomain = await client.domain.findUnique({
//       where: {
//         id,
//       },
//       select: {
//         name: true,
//         filterQuestions: {
//           where: {
//             answered: null,
//           },
//           select: {
//             question: true,
//           },
//         },
//       },
//     });
//     if (chatbotDomain) {
//       const extractedEmail = extractEmailsFromString(message);
//       if (extractedEmail) {
//         customerEmail = extractedEmail[0];
//       }
//       console.log("Customer email: " + customerEmail);
//       if (customerEmail) {
//         const checkCustomer = await client.domain.findUnique({
//           where: {
//             id,
//           },
//           select: {
//             User: {
//               select: {
//                 clerkId: true,
//               },
//             },
//             name: true,
//             customer: {
//               where: {
//                 email: {
//                   startsWith: customerEmail,
//                 },
//               },
//               select: {
//                 id: true,
//                 email: true,
//                 questions: true,
//                 chatRoom: {
//                   select: {
//                     id: true,
//                     live: true,
//                     mailed: true,
//                   },
//                 },
//               },
//             },
//           },
//         });
//         if (checkCustomer && !checkCustomer.customer.length) {
//           const newCustomer = await client.domain.update({
//             where: {
//               id,
//             },
//             data: {
//               customer: {
//                 create: {
//                   email: customerEmail,
//                   questions: {
//                     create: chatbotDomain.filterQuestions,
//                   },
//                   chatRoom: {
//                     create: {},
//                   },
//                 },
//               },
//             },
//           });
//           if (newCustomer) {
//             console.log("New customer Made");
//             const response = {
//               role: "assistant",
//               content: `Welcome abord ${
//                 customerEmail.split("@")[0]
//               }! I'm glad to connect wth you. Is there anything you need help with?`,
//             };
//             return { response };
//           }
//         }

//         if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
//           await onStoreConversation(
//             checkCustomer?.customer[0].chatRoom[0].id!,
//             message,
//             author
//           );
//           //WIP:
//           //   onRealTimeChat(
//           //     checkCustomer.customer[0].chatRoom[0].id,
//           //     message,
//           //     "user",
//           //     author
//           //   );

//           if (!checkCustomer.customer[0].chatRoom[0].mailed) {
//             const user = await clerkClient.users.getUser(
//               checkCustomer.User?.clerkId!
//             );
//             onMailer(user.emailAddresses[0].emailAddress);
//             const mailed = await client.chatRoom.update({
//               where: {
//                 id: checkCustomer.customer[0].chatRoom[0].id,
//               },
//               data: {
//                 mailed: true,
//               },
//             });
//             if (mailed) {
//               return {
//                 live: true,
//                 chatRoom: checkCustomer.customer[0].chatRoom[0].id,
//               };
//             }
//           }
//           return {
//             live: true,
//             chatRoom: checkCustomer.customer[0].chatRoom[0].id,
//           };
//         }

//         await onStoreConversation(
//           checkCustomer?.customer[0].chatRoom[0].id!,
//           message,
//           author
//         );
//         const chatCompletion = await openai.chat.completions.create({
//           messages: [
//             {
//               role: "assistant",
//               content: `
//                 You will get an array of questions that you must ask the customer.

//                 Progress the conversation using those questions.

//                 Whenever you ask a question from the array i need you to add a keyword at the end of the question (complete) this keyword is extremely important.

//                 Do not forget it.

//                 only add this keyword when your asking a question from the array of questions. No other question satisfies this condition

//                 Always maintain character and stay respectfull.

//                 The array of questions : [${chatbotDomain.filterQuestions
//                   .map((questions) => questions.question)
//                   .join(", ")}]

//                 if the customer says something out of context or inapporpriate. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime) at the end.

//                 if the customer agrees to book an appointment send them this link http://localhost:3000/portal/${id}/appointment/${
//                 checkCustomer?.customer[0].id
//               }

//                 if the customer wants to buy a product redirect them to the payment page http://localhost:3000/portal/${id}/payment/${
//                 checkCustomer?.customer[0].id
//               }
//             `,
//             },
//             ...chat,
//             {
//               role: "user",
//               content: message,
//             },
//           ],
//           model: "gpt-3.5-turbo",
//         });

//         if (chatCompletion.choices[0].message.content?.includes("(realtime)")) {
//           const realtime = await client.chatRoom.update({
//             where: {
//               id: checkCustomer?.customer[0].chatRoom[0].id,
//             },
//             data: {
//               live: true,
//             },
//           });

//           if (realtime) {
//             const response = {
//               role: "assistant",
//               content: chatCompletion.choices[0].message.content.replace(
//                 "(realtime)",
//                 ""
//               ),
//             };
//             await onStoreConversation(
//               checkCustomer?.customer[0].chatRoom[0].id!,
//               response.content,
//               "assistant"
//             );
//             return { response };
//           }
//         }
//         if (chat[chat.length - 1].content.includes("(complete)")) {
//           const firstUnansweredqusetions =
//             await client.customerResponses.findFirst({
//               where: {
//                 customerId: checkCustomer?.customer[0].id,
//                 answered: null,
//               },
//               select: {
//                 id: true,
//               },
//               orderBy: {
//                 question: "asc",
//               },
//             });

//           if (firstUnansweredqusetions) {
//             await client.customerResponses.update({
//               where: {
//                 id: firstUnansweredqusetions.id,
//               },
//               data: {
//                 answered: message,
//               },
//             });
//           }
//         }

//         if (chatCompletion) {
//           const generatedLink = extractURLfromString(
//             chatCompletion.choices[0].message.content as string
//           );

//           if (generatedLink) {
//             const link = generatedLink[0];
//             const response = {
//               role: "assistant",
//               content: "Great! you can follow the link to proced",
//               link: link.slice(0, -1),
//             };

//             await onStoreConversation(
//               checkCustomer?.customer[0].chatRoom[0].id!,
//               `${response.content} ${response.link}`,
//               "assistant"
//             );

//             return { response };
//           }

//           const response = {
//             role: "assistant",
//             content: chatCompletion.choices[0].message.content,
//           };

//           await onStoreConversation(
//             checkCustomer?.customer[0].chatRoom[0].id!,
//             `${response.content}`,
//             "assistant"
//           );

//           return { response };
//         }
//       }

//       console.log("No Customer");
//       const chatCompletion = await openai.chat.completions.create({
//         messages: [
//           {
//             role: "assistant",
//             content: `
//             You are a highly knowledgeable and experienced sales representative for a ${chatbotDomain.name} that offers a valuable product or service. Your goal is to have a natural, human-like conversation with the customer in order to understand their needs, provide relevant information, and ultimately guide them towards making a purchase or redirect them to a link if they havent provided all relevant information.
//             Right now you are talking to a customer for the first time. Start by giving them a warm welcome on behalf of ${chatbotDomain.name} and make them feel welcomed.

//             Your next task is lead the conversation naturally to get the customers email address. Be respectful and never break character

//           `,
//           },
//           ...chat,
//           {
//             role: "user",
//             content: message,
//           },
//         ],
//         model: "gpt-3.5-turbo",
//       });
//       if (chatCompletion) {
//         const response = {
//           role: "assistant",
//           content: chatCompletion.choices[0].message.content,
//         };
//         return { response };
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const onAichatBotAssistent = async (
  id: string,
  chat: { role: "assistant" | "user"; content: string }[],
  author: "user",
  message: string
) => {
  try {
    const chatbotDomain = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        filterQuestions: {
          where: {
            answered: null,
          },
          select: {
            question: true,
          },
        },
      },
    });
    console.log("chatbotDomain=>", chatbotDomain);
    if (chatbotDomain) {
      const extractedEmail = extractEmailsFromString(message);
      if (extractedEmail) {
        customerEmail = extractedEmail[0];
      }
      console.log("Customer email: " + customerEmail);

      if (customerEmail) {
        const checkCustomer = await client.domain.findUnique({
          where: {
            id,
          },
          select: {
            User: {
              select: {
                clerkId: true,
              },
            },
            name: true,
            customer: {
              where: {
                email: {
                  startsWith: customerEmail,
                },
              },
              select: {
                id: true,
                email: true,
                questions: true,
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                    mailed: true,
                  },
                },
              },
            },
          },
        });
        console.log("checkCustomer =>", checkCustomer);
        if (checkCustomer && !checkCustomer.customer.length) {
          const newCustomer = await client.domain.update({
            where: {
              id,
            },
            data: {
              customer: {
                create: {
                  email: customerEmail,
                  questions: {
                    create: chatbotDomain.filterQuestions,
                  },
                  chatRoom: {
                    create: {},
                  },
                },
              },
            },
          });
          if (newCustomer) {
            console.log("New customer Made");
            const response = {
              role: "assistant",
              content: `Welcome abord ${
                customerEmail.split("@")[0]
              }! I'm glad to connect wth you. Is there anything you need help with?`,
            };
            return { response };
          }
        }

        if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
          await onStoreConversation(
            checkCustomer?.customer[0].chatRoom[0].id!,
            message,
            author
          );
            onRealTimeChat(
              checkCustomer.customer[0].chatRoom[0].id,
              message,
              "user",
              author
            );

          if (!checkCustomer.customer[0].chatRoom[0].mailed) {
            const user = await clerkClient.users.getUser(
              checkCustomer.User?.clerkId!
            );
            onMailer(user.emailAddresses[0].emailAddress);
            const mailed = await client.chatRoom.update({
              where: {
                id: checkCustomer.customer[0].chatRoom[0].id,
              },
              data: {
                mailed: true,
              },
            });
            if (mailed) {
              return {
                live: true,
                chatRoom: checkCustomer.customer[0].chatRoom[0].id,
              };
            }
          }
          return {
            live: true,
            chatRoom: checkCustomer.customer[0].chatRoom[0].id,
          };
        }

        await onStoreConversation(
          checkCustomer?.customer[0].chatRoom[0].id!,
          message,
          author
        );

        const chatCompletion = await generateAssistantResponse(
          chatbotDomain,
          id,
          chat,
          message,
          checkCustomer
        );
        if (chatCompletion.includes("(realtime)")) {
          const realtime = await client.chatRoom.update({
            where: {
              id: checkCustomer?.customer[0].chatRoom[0].id,
            },
            data: {
              live: true,
            },
          });

          if (realtime) {
            const response = {
              role: "assistant",
              content: chatCompletion.replace("(realtime)", ""),
            };
            await onStoreConversation(
              checkCustomer?.customer[0].chatRoom[0].id!,
              response.content,
              "assistant"
            );
            return { response };
          }
        }
        if (chat[chat.length - 1].content.includes("(complete)")) {
          const firstUnansweredqusetions =
            await client.customerResponses.findFirst({
              where: {
                customerId: checkCustomer?.customer[0].id,
                answered: null,
              },
              select: {
                id: true,
              },
              orderBy: {
                question: "asc",
              },
            });

          if (firstUnansweredqusetions) {
            await client.customerResponses.update({
              where: {
                id: firstUnansweredqusetions.id,
              },
              data: {
                answered: message,
              },
            });
          }
        }
        if (checkIncludes(message)) {
          const link = `http://localhost:3000/portal/${id}/appointment/${checkCustomer?.customer[0].id}`;
          const generatedLink = extractURLfromString(link);
          if (generatedLink) {
            const response = {
              role: "assistant",
              content: "Great! you can follow the link to proced",
              link: link,
            };

            await onStoreConversation(
              checkCustomer?.customer[0].chatRoom[0].id!,
              `${response.content} ${response.link}`,
              "assistant"
            );
            console.log("Response=>>>>>>>>>>>", response);

            return { response };
          }

          const response = {
            role: "assistant",
            content: chatCompletion,
          };

          await onStoreConversation(
            checkCustomer?.customer[0].chatRoom[0].id!,
            `${response.content}`,
            "assistant"
          );

          return { response };
        }
        if (checkIncludePayment(message)) {
          const link = `http://localhost:3000/portal/${id}/payment/${checkCustomer?.customer[0].id}`;
          const generatedLink = extractURLfromString(link);
          if (generatedLink) {
            const response = {
              role: "assistant",
              content: "Great! you can follow the link to proced",
              link: link,
            };

            await onStoreConversation(
              checkCustomer?.customer[0].chatRoom[0].id!,
              `${response.content} ${response.link}`,
              "assistant"
            );
            return { response };
          }

          const response = {
            role: "assistant",
            content: chatCompletion,
          };

          await onStoreConversation(
            checkCustomer?.customer[0].chatRoom[0].id!,
            `${response.content}`,
            "assistant"
          );

          return { response };
        }
      }

      console.log("No Customer");
      const chatCompletion = await generateAssistantResponse2(
        chatbotDomain,
        chat,
        message
      );
      if (chatCompletion) {
        const response = {
          role: "assistant",
          content: chatCompletion,
        };
        return { response };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// New functions to interact with Gemini AI
// async function generateWelcomeMessage(email?: string) {
//   const prompt = `Write a warm welcome message for a new customer to ${chatbotDomain?.name || ""}`;
//   if (email) {
//     prompt += ` addressing them by their email address (split at "@"): ${email.split("@")[0]}`;
//   }
//   const response = await callGeminiAI(prompt);
//   return response.content;
// }

async function generateAssistantResponse(
  chatbotDomain: any,
  id: string,
  chatHistory: any[],
  userMessage: string,
  checkCustomer: any
) {
  const prompt = `You are a chatbot assistant for ${chatbotDomain.name}. 
  The user has the following conversation history: 
  ${chatHistory.map((message) => message.content).join("\n  ")}
  The user just said: ${userMessage}You will get an array of questions that you must ask the customer. Progress the conversation using those questions. Whenever you ask a question from the array i need you to add a keyword at the end of the question (complete) this keyword is extremely important. 
  Do not forget it.only add this keyword when your asking a question from the array of questions. No other question satisfies this condition.Always maintain character and stay respectfull.The array of questions : [${chatbotDomain.filterQuestions
    .map((questions: any) => questions.question)
    .join(", ")}]
    if the customer says something out of context or inapporpriate. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime) at the end.
    if the customer agrees to book an appointment send them this link http://localhost:3000/portal/${id}/appointment/${
    checkCustomer?.customer[0].id
  }
    if the customer wants to buy a product redirect them to the payment page http://localhost:3000/portal/${id}/payment/${
    checkCustomer?.customer[0].id
  }`;

  const response = await generateText(prompt);
  return response;
}

async function generateAssistantResponse2(
  chatbotDomain: any,
  chatHistory: any[],
  userMessage: string
) {
  const prompt = `You are a chatbot assistant for ${chatbotDomain.name}. 
  The user has the following conversation history: 
  ${chatHistory.map((message) => message.content).join("\n  ")}
  The user just said: ${userMessage}You are a highly knowledgeable and experienced sales representative for a ${
    chatbotDomain.name
  } that offers a valuable product or service. Your goal is to have a natural, human-like conversation with the customer in order to understand their needs, provide relevant information, and ultimately guide them towards making a purchase or redirect them to a link if they havent provided all relevant information.
     Right now you are talking to a customer for the first time. Start by giving them a warm welcome on behalf of ${
       chatbotDomain.name
     } and make them feel welcomed.

    Your next task is lead the conversation naturally to get the customers email address. Be respectful and never break character

    `;

  const response = await generateText(prompt);
  return response;
}

export async function generateText(prompt: string) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

function checkIncludes(message: string): boolean {
  const words = [
    "book a appointment",
    "appointment",
    "can you provide me appointment link",
    "i want book a appointment",
    "i want book an appointment",
    "can you book my appointment",
  ];
  const result = words.some((word) => message.includes(word));
  console.log(`Message: "${message}"`);
  words.forEach((word) => {
    console.log(`Does message include "${word}"? ${message.includes(word)}`);
  });
  return result;
}

function checkIncludePayment(message: string): boolean {
  const words = [
    "give me a payment link",
    "give me a payment product link",
    "i want purchase your product",
    "i want purchase your product please provide me a payment link",
    "can you provide a payment",
    "can you provide me a payment",
    "can you provide me an payment",
    "payment",
    "payment link",
  ];
  const result = words.some((word) => message.includes(word));
  console.log(`Message: "${message}"`);
  words.forEach((word) => {
    console.log(`Does message include "${word}"? ${message.includes(word)}`);
  });
  return result;
}
