"use server";

import { client } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs";

export const onGetSubscriptionPlan = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return;
    }
    const plan = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (plan) {
      return plan.subscription?.plan;
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const OnGetAllAccountDomains = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return;
    }
    const domains = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return { ...domains };
  } catch (error) {
    console.log(error);
  }
};

export const onIntegrateDomain = async (domain: string, icon: string) => {
  console.log("Domain Icon =", icon);
  const user = await currentUser();
  if (!user) {
    return;
  }
  try {
    const subscription = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    const domainExists = await client.user.findFirst({
      where: {
        clerkId: user.id,
        domains: {
          some: {
            name: domain,
          },
        },
      },
    });

    if (!domainExists) {
      if (
        (subscription?.subscription?.plan == "STANDARD" &&
          subscription._count.domains < 1) ||
        (subscription?.subscription?.plan == "PRO" &&
          subscription._count.domains < 5) ||
        (subscription?.subscription?.plan == "ULTIMATE" &&
          subscription._count.domains < 10)
      ) {
        const newDomain = await client.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            domains: {
              create: {
                name: domain,
                icon,
                chatBot: {
                  create: {
                    welcomeMessage: "Hey there, have a question? Text us here",
                  },
                },
              },
            },
          },
        });
        if (newDomain) {
          return { status: 200, message: "Domain SuccessFully Added" };
        }
      }
      return {
        status: 400,
        message: "You have reached maximum limit of domains, upgrade your plan",
      };
    }
    return {
      status: 400,
      message: "Domain Already Exists",
    };
  } catch (error: any) {
    return error.message;
  }
};

export const onUpdatePassword = async (password: string) => {
  const user = await currentUser();
  if (!user) {
    return;
  }
  try {
    const updated = await clerkClient.users.updateUser(user.id, { password });
    if (updated) {
      return { status: 200, message: "Password Updated Successfully" };
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const OnGetCurrentDomainInfo = async (domain: string) => {
  const user = await currentUser();

  if (!user) {
    return;
  }

  try {
    const domainInfo = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        domains: {
          where: {
            name: {
              contains: domain,
            },
          },
          select: {
            id: true,
            name: true,
            icon: true,
            userId: true,
            chatBot: {
              select: {
                welcomeMessage: true,
                id: true,
                icon: true,
              },
            },
          },
        },
      },
    });
    if (domainInfo) {
      return domainInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateDomain = async (id: string, name: string) => {
  try {
    const domainExists = await client.domain.findFirst({
      where: {
        name: {
          contains: name,
        },
      },
    });

    if (!domainExists) {
      const domain = await client.domain.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      if (domain) {
        return { status: 200, message: "Domain Updated Successfully" };
      }
      return {
        status: 400,
        message: "oops, something went wrong!",
      };
    }
    return {
      status: 400,
      message: "Domain Already Exists with this name",
    };
  } catch (error: any) {
    console.log(error.message);
  }
};

export const onchatBotImageUpdate = async (id: string, icon: string) => {
  const user = await currentUser();
  if (!user) {
    return;
  }

  try {
    const domain = await client.domain.update({
      where: {
        id,
      },
      data: {
        chatBot: {
          update: {
            data: {
              icon,
            },
          },
        },
      },
    });
    if (domain) {
      return { status: 200, message: "ChatBot Icon Updated Successfully" };
    }
    return {
      status: 400,
      message: "oops, something went wrong!. Please try again",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateWelcomeMessage = async (id: string, message: string) => {
  const user = await currentUser();
  if (!user) {
    return;
  }

  try {
    const domain = await client.domain.update({
      where: {
        id,
      },
      data: {
        chatBot: {
          update: {
            data: {
              welcomeMessage: message,
            },
          },
        },
      },
    });
    if (domain) {
      return {
        status: 200,
        message: "ChatBot WelcomeMessage Updated Successfully",
      };
    }
    return {
      status: 400,
      message: "oops, something went wrong!. Please try again",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onDeleteUserDomain = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    return;
  }
  try {
    const validuser = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        fullname: true,
      },
    });

    if (validuser) {
      const domaindeleted = await client.domain.delete({
        where: {
          userId: validuser.id,
          id,
        },
        select: {
          name: true,
        },
      });
      if (domaindeleted) {
        return {
          status: 200,
          message: `${domaindeleted.name} was Deleted Successfully`,
        };
      }
      return {
        status: 400,
        message: "oops, something went wrong!. Please try again",
      };
    }
    return {
      status: 400,
      message: `User is Not Valid For Deleteing this Domain`,
    };
  } catch (error) {
    console.log(error);
  }
};

export const onCreateHelpDeskQusetion = async (
  id: string,
  question: string,
  answer: string
) => {
  try {
    const helpDeskQusetion = await client.domain.update({
      where: {
        id,
      },
      data: {
        helpdesk: {
          create: {
            question,
            answer,
          },
        },
      },
      include: {
        helpdesk: {
          select: {
            id: true,
            question: true,
            answer: true,
          },
        },
      },
    });

    if (helpDeskQusetion) {
      return {
        status: 200,
        message: "HelpDesk Question Created Successfully",
        questions: helpDeskQusetion.helpdesk,
      };
    }
    return {
      status: 400,
      message: "oops, something went wrong!. Please try again",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetALLHelpDeskQuestions = async (id: string) => {
  try {
    const questions = await client.helpDesk.findMany({
      where: {
        domainId: id,
      },
      select: {
        question: true,
        answer: true,
        id: true,
      },
    });
    if (questions) {
      return {
        status: 200,
        message: "HelpDesk Questions Fetched Successfully",
        questions: questions,
      };
    }
    return {
      status: 400,
      message: "oops, something went wrong!. Please try again",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onDeleteQus = async (id: string) => {
  try {
    const deleted = await client.helpDesk.delete({
      where: {
        id,
      },
    });
    if (deleted) {
      return {
        status: 200,
        message: "HelpDesk Question Deleted Successfully",
      };
    }
    return {
      status: 400,
      message: "oops, something went wrong!. Please try again",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onCreateFilterQuestions = async (id: string, question: string) => {
  try {
    const filterquestion = await client.domain.update({
      where: {
        id,
      },
      data: {
        filterQuestions: {
          create: {
            question,
          },
        },
      },
      include: {
        filterQuestions: {
          select: {
            id: true,
            question: true,
          },
        },
      },
    });
    if (filterquestion) {
      return {
        status: 200,
        message: "Filter Question Created Successfully",
        questions: filterquestion.filterQuestions,
      };
    }
    return {
      status: 400,
      message: "oops, something went wrong!. Please try again",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetALLFilterQuestions = async (id: string) => {
  try {
    const questions = await client.filterQuestions.findMany({
      where: {
        domainId: id,
      },
      select: {
        question: true,
        id: true,
      },
      orderBy: {
        question: "asc",
      },
    });
      return {
        status: 200,
        message: "Filter Questions Fetched Successfully",
        questions: questions,
      };
  } catch (error) {
    console.log(error);
  }
};


export const ongetStripeConnect = async ()=>{
  try {
        const user = await currentUser();
          if (user) {
            const connected = await client.user.findUnique({
              where:{
                clerkId:user.id,
              },
              select:{
                stripeId:true,
              }
            })
            if (connected) {
               return connected.stripeId
            }
          }
      } catch (error) {
        console.log(error);
      }
}