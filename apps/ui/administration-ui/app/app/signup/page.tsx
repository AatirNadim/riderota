"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Car } from "lucide-react";
import { BasicInfoForm } from "@/components/form/basic-info-form";
import { ProfileDetailsForm } from "@/components/form/profile-details-form";
import { TenantDetailsForm } from "@/components/form/tenant-info-form";
import { SignupSuccess } from "@/components/signup-success";
import { SignupData } from "@/lib/types";



const steps = [
  { id: 1, title: "Basic Information", description: "Create your account" },
  { id: 2, title: "Profile Details", description: "Complete your profile" },
  {
    id: 3,
    title: "Organization Setup",
    description: "Setup your organization",
  },
  { id: 4, title: "Success", description: "Welcome to RideRota" },
];

export function SuperAdminSignup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<Partial<SignupData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-primary-gradient rounded-xl">
              <Car className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary-gradient">
              RideRota
            </span>
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--neutral-900)" }}
          >
            Create Your Organization
          </h1>
          <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
            Set up your cab management system in just a few steps
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  currentStep >= step.id
                    ? "text-primary-600"
                    : "text-neutral-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-primary-gradient text-white"
                      : "bg-neutral-200 text-neutral-500"
                  }`}
                >
                  {step.id}
                </div>
                <div className="text-xs font-medium text-center hidden sm:block">
                  <div>{step.title}</div>
                  <div className="text-neutral-500">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Form Card */}
        <Card className="border-0 shadow-custom">
          <CardHeader className="text-center pb-6">
            <CardTitle
              className="text-xl"
              style={{ color: "var(--neutral-900)" }}
            >
              {steps[currentStep - 1]?.title}
            </CardTitle>
            <CardDescription className="text-base">
              {steps[currentStep - 1]?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <BasicInfoForm
                  key="basic-info"
                  data={signupData}
                  onNext={(data) => {
                    updateSignupData(data);
                    nextStep();
                  }}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}
              {currentStep === 2 && (
                <ProfileDetailsForm
                  key="profile-details"
                  data={signupData}
                  onNext={(data) => {
                    updateSignupData(data);
                    nextStep();
                  }}
                  onBack={prevStep}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}
              {currentStep === 3 && (
                <TenantDetailsForm
                  key="tenant-details"
                  data={signupData}
                  onNext={(data) => {
                    updateSignupData(data);
                    nextStep();
                  }}
                  onBack={prevStep}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}
              {currentStep === 4 && (
                <SignupSuccess key="success" data={signupData as SignupData} />
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Footer */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-sm" style={{ color: "var(--neutral-500)" }}>
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Sign in here
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
