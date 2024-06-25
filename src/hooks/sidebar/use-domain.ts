import { onIntegrateDomain } from "@/actions/settings";
import { useToast } from "@/components/ui/use-toast";
import { AddDomainSchema } from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export const useDomain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(AddDomainSchema),
  });

  const pathName = usePathname();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
  
  let url:string=''

  const router = useRouter();

  useEffect(() => {
    setIsDomain(pathName.split("/").pop());
  }, [pathName]);

  const onAddDomain = handleSubmit(async (values: FieldValues) => {
    setLoading(true);
    const image = values.image[0];
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.post("/api/uploadimage", formData);
      const data = await response.data;

      console.log(data);
      url=data.data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
    }
    const domain = await onIntegrateDomain(values.domain, url);

    if (domain) {
      reset();
      setLoading(false);
      toast({
        title: domain.status == 200 ? "Success" : "Error",
        description: domain.message,
      });
      router.refresh();
    }
  });

  return {
    register,
    onAddDomain,
    errors,
    loading,
    isDomain,
    url,
  };
};
