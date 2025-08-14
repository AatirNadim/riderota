"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BasicInfoForm } from "@/components/form/basic-info-form";
import { ProfileDetailsForm } from "@/components/form/profile-details-form";
import Link from "next/link";
import { SignupData } from "@/lib/types";

function MultiStepSignupForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<Partial<SignupData>>({});

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const progress = (currentStep / 2) * 100;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{ background: "var(--primary-300)" }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{ background: "var(--secondary-300)" }}
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-primary-gradient rounded-xl shadow-lg">
              <Car className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary-gradient">
              RideRota
            </span>
          </div>
          <h1 className="text-[var(--neutral-900)] text-3xl font-bold mb-2">
            Create Your Account
          </h1>
          <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
            Start managing your {`organization's`} transportation
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div className="mb-6" variants={itemVariants}>
          <div className="flex justify-between mb-2">
            <span
              className={`text-sm font-medium ${
                currentStep >= 1 ? "text-primary-600" : "text-neutral-400"
              }`}
            >
              Basic Info
            </span>
            <span
              className={`text-sm font-medium ${
                currentStep >= 2 ? "text-primary-600" : "text-neutral-400"
              }`}
            >
              Account Details
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Form Card */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-custom bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle
                className="text-xl"
                style={{ color: "var(--neutral-900)" }}
              >
                {currentStep === 1
                  ? "Basic Information"
                  : "Complete Your Profile"}
              </CardTitle>
              <CardDescription className="text-base">
                {currentStep === 1
                  ? "Let's start with your basic details"
                  : "Set up your account security and profile"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Back Button for Step 2 */}
              {currentStep === 2 && (
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    className="p-0 h-auto text-primary-600 hover:text-primary-700 hover:bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Basic Info
                  </Button>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <BasicInfoForm
                    key="step-one"
                    data={signupData}
                    onNext={(data) => {
                      updateSignupData(data);
                      nextStep();
                    }}
                  />
                )}
                {currentStep === 2 && (
                  <ProfileDetailsForm
                    key="step-two"
                    data={signupData}
                    onComplete={(data) => {
                      updateSignupData(data);
                      // Handle final submission
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Terms and Privacy - Only show on step 2 */}
              {currentStep === 2 && (
                <motion.div
                  className="text-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p
                    className="text-xs"
                    style={{ color: "var(--neutral-500)" }}
                  >
                    By creating an account, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="text-primary-600 hover:text-primary-700 underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary-600 hover:text-primary-700 underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div className="text-center mt-8" variants={itemVariants}>
          <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:text-primary-700 underline"
            >
              Sign in here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MultiStepSignupForm;
