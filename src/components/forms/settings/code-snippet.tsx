"use client";
import Section from "@/components/section_lable/Section";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import React from "react";

type Props = {
  id: string;
};

const CodeSnippet = ({ id }: Props) => {
  const { toast } = useToast();
  let snippet = `
 <script>
    const iframe = document.createElement("iframe");
    
    const iframeStyles = (styleString) => {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
    }
    
    iframeStyles('
        .chat-frame {
            height: 592px;
            position: fixed;
            bottom: 50px;
            right: 50px;
            border: none;
        }
    ')
    
    iframe.src = "https://echo-ai399.vercel.app/chatbot"
    iframe.classList.add('chat-frame')
    document.body.appendChild(iframe)
    
    window.addEventListener("message", (e) => {
        if(e.origin !== "https://echo-ai399.vercel.app/") return null
        let dimensions = JSON.parse(e.data)
        iframe.width = dimensions.width
        iframe.height = dimensions.height
        iframe.contentWindow.postMessage("98cbc9de-cf54-4eb2-896e-08cb42d16565", "https://echo-ai399.vercel.app/")
    })
        </script>
        `;

  return (
    <div className="mt-10 flex flex-col gap-5 items-start">
      <Section
        lable="Code snippet"
        message="Copy and paste this code snippet into the header tag of your website"
      />
      <div className="bg-cream px-10 rounded-lg inline-block relative">
        <Copy
          className="absolute top-5 right-5 text-gray-400 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(snippet);
            toast({
              title: "Copied to clipboard",
              description: "You can now paste the code inside your website",
            });
          }}
        />
        <pre>
          <code className="text-gray-500">{snippet}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
