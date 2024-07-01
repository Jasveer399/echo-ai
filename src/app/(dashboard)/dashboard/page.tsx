import {
  getUserAllTranScetions,
  getUserAppointment,
  getUserClient,
  getUserPlan,
  getUserSeles,
  getUserTotalProductPrice,
} from "@/actions/dashboard";
import DashBoardCard from "@/components/dashBoard/DashBoardCard";
import PlanUsage from "@/components/dashBoard/PlanUsage";
import Infobar from "@/components/infobar/infobar";
import { Separator } from "@/components/ui/separator";
import CalIcon from "@/icons/cal-icon";
import PersonIcon from "@/icons/person-icon";
import { TransactionsIcon } from "@/icons/transactions-icon";
import { DollarSign } from "lucide-react";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const client = await getUserClient();
  const sales = await getUserSeles();
  const appointment = await getUserAppointment();
  const plan = await getUserPlan();
  const totalPrice = await getUserTotalProductPrice();
  const transactions = await getUserAllTranScetions();
  return (
    <>
      <Infobar />
      <div className="overflow-auto w-full chat-window flex-1 h-0">
        <div className="flex gap-5 flex-wrap">
          <DashBoardCard
            title="Potential Clients"
            value={client || 0}
            icon={<PersonIcon />}
          />
          <DashBoardCard
            title="Pipline Value"
            sales
            value={totalPrice! * client! || 0}
            icon={<DollarSign />}
          />
          <DashBoardCard
            title="Appointments"
            value={appointment || 0}
            icon={<CalIcon />}
          />
          <DashBoardCard
            title="Total Sales"
            sales
            value={sales || 0}
            icon={<PersonIcon />}
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10">
          <div>
            <div>
              <h2 className="font-bold text-2xl">Plan Usage</h2>
              <p className="text-sm font-light">
                A detailed overview of your metrics,usage,customers and more
              </p>
            </div>
            <PlanUsage
              plan={plan?.plan!}
              credits={plan?.credits || 0}
              domains={plan?.domains || 0}
              client={client || 0}
            />
          </div>
          <div className="flex flex-col">
            <div className="w-full justify-between items-start mb-5">
              <div className="flex gap-3 items-center">
                <TransactionsIcon />
                <p className="font-bold">Recent Transactions</p>
              </div>
              <p className="text-sm">See more</p>
            </div>
            <Separator orientation="horizontal" />
            {transactions &&
              transactions.data.map((transaction) => (
                <div
                  className="flex gap-5 w-full justify-between items-center border-b-2 py-5"
                  key={transaction.id}
                >
                  <p className="font-bold">
                    {transaction.calculated_statement_descriptor}
                  </p>
                  <p className="font-bold text-xl">
                    ${transaction.amount / 100}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
