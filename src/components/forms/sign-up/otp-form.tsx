import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import React from "react";

type Props = {
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  otp: string;
};

const OtpForm = ({ setOtp, otp }: Props) => {
  return (
    <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
      <div className=" flex gap-3">
        <div>
          <InputOTPSlot className="border border-orange" index={0} />
        </div>
        <div>
          <InputOTPSlot className="border border-orange" index={1} />
        </div>
        <div>
          <InputOTPSlot className="border border-orange" index={2} />
        </div>
        <div>
          <InputOTPSlot className="border border-orange" index={3} />
        </div>
        <div>
          <InputOTPSlot className="border border-orange" index={4} />
        </div>
        <div>
          <InputOTPSlot className="border border-orange" index={5} />
        </div>
      </div>
    </InputOTP>
  );
};

export default OtpForm;
