import { useToast } from "@/components/ui/use-toast";
import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignInForm = () => {
  const { signIn, isLoaded, setActive } = useSignIn();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const mathods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });

  const onHandelSubmit = mathods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        const signedIn = await signIn.create({
          identifier: values.email,
          password: values.password,
        });
        if (signedIn.status === "complete") {
          await setActive({ session: signedIn.createdSessionId });
          toast({
            title: "Success",
            description: "Welcome back!",
          });
          router.replace("/dashboard");
        }
      } catch (error: any) {
        console.log(error);
        if (error.errors[0].code === "form_password_incorrect") {
          toast({
            title: "Error",
            description: "Email/Password is incorrect Please try again",
          });
        }
      } finally {
        setLoading(false);
      }
    }
  );
  return {
    mathods,
    onHandelSubmit,
    loading,
  };
};
