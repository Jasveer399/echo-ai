import {
  onCreateFilterQuestions,
  onCreateHelpDeskQusetion,
  onCreateNewProduct,
  onDeleteQus,
  onDeleteUserDomain,
  onGetALLFilterQuestions,
  onGetALLHelpDeskQuestions,
  onUpdateDomain,
  onUpdatePassword,
  onUpdateWelcomeMessage,
  onchatBotImageUpdate,
} from "@/actions/settings";
import { useToast } from "@/components/ui/use-toast";
import {
  ChangePasswordProps,
  ChangePasswordSchema,
} from "@/schemas/auth.schema";
import {
  AddProductProps,
  AddProductSchema,
  DomainSettingsProps,
  DomainSettingsSchema,
  FilterQuestionsProps,
  FilterQuestionsSchema,
  HelpDeskQuestionsProps,
  HelpDeskQuestionsSchema,
} from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useChanhePasswodr = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordProps>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onChangePassword = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const update = await onUpdatePassword(values.password);
      if (update) {
        reset();
        setLoading(false);
        toast({
          title: "Password Updated",
          description: update.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return {
    onChangePassword,
    register,
    errors,
    loading,
  };
};

export const useSettings = (id: string) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DomainSettingsProps>({
    resolver: zodResolver(DomainSettingsSchema),
  });

  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  let url: string = "";
  const onUpdateDomainSetting = handleSubmit(async (values) => {
    setLoading(true);

    if (values.domain) {
      const domain = await onUpdateDomain(id, values.domain);
      if (domain) {
        toast({
          title: "Success",
          description: domain.message,
        });
      }
    }

    if (values.image[0]) {
      const image = values.image[0];
      if (!image) return;

      try {
        const formData = new FormData();
        formData.append("image", image);
        const response = await axios.post("/api/uploadimage", formData);
        const data = await response.data;

        console.log(data);
        url = data.data.secure_url;
      } catch (error) {
        console.error("Upload failed:", error);
      }
      const imageupdate = await onchatBotImageUpdate(id, url);
      if (imageupdate) {
        toast({
          title: "Success",
          description: imageupdate.message,
        });
      }
    }

    if (values.welcomeMessage) {
      const welcomeMessage = await onUpdateWelcomeMessage(
        id,
        values.welcomeMessage
      );
      if (welcomeMessage) {
        toast({
          title: "Success",
          description: welcomeMessage.message,
        });
      }
    }
    setLoading(false);
    reset();
    router.refresh();
  });

  const onDeleteDomain = async () => {
    setDeleting(true);
    const domain = await onDeleteUserDomain(id);
    if (domain) {
      toast({
        title: "Success",
        description: domain.message,
      });
    }
    setDeleting(false);
    router.refresh();
  };

  return {
    onUpdateDomainSetting,
    register,
    errors,
    loading,
    deleting,
    onDeleteDomain,
    reset,
  };
};

export const useHelpDesk = (id?: string) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HelpDeskQuestionsProps>({
    resolver: zodResolver(HelpDeskQuestionsSchema),
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isQuestion, setIsQuestion] = useState<
    { id: string; question: string; answer: string }[]
  >([]);
  const [deleting, setDeleting] = useState<boolean>(false);

  const onSubmitQuestion = handleSubmit(async (values) => {
    setLoading(true);
    const question = await onCreateHelpDeskQusetion(
      id!,
      values.question,
      values.answer
    );

    if (question) {
      setIsQuestion(question.questions!);
      toast({
        title: question.status === 200 ? "Success" : "Error",
        description: question.message,
      });
    }
    setLoading(false);
    reset();
  });

  const onGetQuestions = async () => {
    setLoading(true);
    const questions = await onGetALLHelpDeskQuestions(id!);
    if (questions) {
      setIsQuestion(questions.questions!);
      setLoading(false);
    }
  };

  const onDeleteQuestion = async (questionId: string) => {
    setDeleting(true);
    const response = await onDeleteQus(questionId);
    if (response) {
      toast({
        title: response.status === 200 ? "Success" : "Error",
        description: response.message,
      });
      if (response.status === 200) {
        setIsQuestion((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== questionId)
        );
      }
    }
    setDeleting(false);
  };

  // const onEditQuestion = async (
  // id: string,
  // question: string,
  // answer: string
  // ) => {
  // setLoading(true);
  // const update = await onUpdateQuestion(id, question, answer);
  // if (update) {
  //     toast({
  //       title: update.status === 200? "Success" : "Error",
  //       description: update.message,
  //     });
  //     setLoading(false);
  //     reset();
  //   }
  //   onGetQuestions();
  // };

  useEffect(() => {
    onGetQuestions();
  }, []);

  return {
    register,
    onSubmitQuestion,
    errors,
    loading,
    isQuestion,
    onGetQuestions,
    onDeleteQuestion,
    reset,
    deleting,
  };
};

export const useFilterQuestion = (id: string) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterQuestionsProps>({
    resolver: zodResolver(FilterQuestionsSchema),
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isQuestions, setIsQuestions] = useState<
    { id: string; question: string }[]
  >([]);

  const onAddFilterQuestions = handleSubmit(async (values) => {
    setLoading(true);
    const questions = await onCreateFilterQuestions(id!, values.question);
    if (questions) {
      setIsQuestions(questions.questions!);
      toast({
        title: questions.status === 200 ? "Success" : "Error",
        description: questions.message,
      });
    }
    reset();
    setLoading(false);
  });

  const onGetQuestions = async () => {
    setLoading(true);
    const questions = await onGetALLFilterQuestions(id!);
    if (questions) {
      setIsQuestions(questions.questions!);
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetQuestions();
  }, []);

  return {
    register,
    onAddFilterQuestions,
    errors,
    loading,
    isQuestions,
  };
};

export const useProducts = (domainId: string) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<AddProductProps>({ resolver: zodResolver(AddProductSchema) });
  const onCreateProduct = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const image = values.image[0];
      if (!image) return;
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.post("/api/uploadimage", formData);
      const data = await response.data;

      console.log(data);
      const url = data.data.secure_url;

      const product = await onCreateNewProduct(
        domainId,
        values.name,
        values.price,
        url
      );
      if (product?.status == 200) {
        reset();
       
        toast({
          title: "Success",
          description: product.message,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  return {
    loading,
    onCreateProduct,
    register,
    errors,
  };
};
