/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { initiatePayment } from "@/service/Payment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  tier: "basic" | "standard" | "premium";
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    name: "Basic",
    price: "Free",
    description: "Limited access to explore local food posts.",
    tier: "basic",
    features: ["View 5 posts/day", "Access basic listings"],
  },
  {
    name: "Premium",
    price: "$500/mo",
    description: "Unlimited access to all regular food posts.",
    tier: "premium",
    features: [
      "All Standard features",
      "Premium post access",
      "Early event alerts",
      "Support local foodies",
    ],
    highlight: true,
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const user = useSelector(selectCurrentUser);
  const router = useRouter();

  // const handleSubscribe = async (plan: Plan) => {
  //   setSelectedPlan(plan.tier);
  //   setSubmitting(true);

  //   try {
  //     const res = await fetch("/api/subscribe", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ plan: plan.tier }),
  //     });

  //     if (!res.ok) throw new Error("Subscription failed");

  //     alert(`Subscribed to ${plan.name} plan successfully!`);
  //   } catch (error) {
  //     alert("Subscription failed. Try again.");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubscribe = async (plan: Plan) => {
    if (!user) {
      toast.success("Please login to subscribe.");
      return;
    }
    setSelectedPlan(plan.tier);
    setSubmitting(true);

    try {
      let amount = 0;
      let expiresIn = 0;

      if (plan.tier === "premium") {
        amount = 500;
        expiresIn = 30;
      }

      if (amount === 0) {
        toast.success("Subscribed to Basic plan successfully!");
        setSubmitting(false);
        return;
      }

      const res = await initiatePayment(amount, expiresIn);

      if (!res.success) throw new Error(res.error);
      router.push(res.paymentUrl);
    } catch (error) {
      toast.error("Subscription failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-arima mt-20 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Subscription Plans
        </h1>
        <p className="text-gray-600 text-lg">
          Choose the perfect plan for exploring local food gems!
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className={`flex flex-col justify-between rounded-3xl shadow-xl p-6 border transition-transform duration-300 ${
              plan.highlight
                ? "border-orange-400 bg-white hover:scale-105"
                : "border-gray-200 bg-white hover:scale-105"
            }`}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {plan.name}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

              <p className="text-3xl font-bold text-orange-600 mb-6">
                {plan.price}
              </p>

              <ul className="space-y-2 text-left text-gray-600 text-sm mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 font-bold mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSubscribe(plan)}
              disabled={submitting && selectedPlan === plan.tier}
              className={`w-full py-3 rounded-xl text-white font-medium transition-all duration-200 ${
                submitting && selectedPlan === plan.tier
                  ? "bg-gray-400 cursor-not-allowed"
                  : plan.highlight
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-800 hover:bg-gray-900"
              }`}
            >
              {submitting && selectedPlan === plan.tier
                ? "Processing..."
                : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
