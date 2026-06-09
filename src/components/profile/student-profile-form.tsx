"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createStudentProfile } from "@/server/profile/profile.service";
import {
  gradeLevels,
  studentProfileSchema,
  studentProfileSteps,
  type StudentProfileInput,
  zodErrorsToRecord,
} from "@/validation/profile.validation";

const initialFormData: StudentProfileInput = {
  phone: "",
  address: "",
  gradeLevel: "Class 1",
  school: "",
};

export function StudentProfileForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StudentProfileInput>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const validateStep = (step: number) => {
    const stepConfig = studentProfileSteps.find((item) => item.id === step);
    const result = studentProfileSchema.safeParse(formData);
    const allErrors = result.success ? {} : zodErrorsToRecord(result.error);
    const stepErrors = Object.fromEntries(
      Object.entries(allErrors).filter(([key]) =>
        stepConfig?.fields.includes(key as never),
      ),
    );

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const updateField = (field: keyof StudentProfileInput, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const submit = () => {
    const result = studentProfileSchema.safeParse(formData);

    if (!result.success) {
      setErrors(zodErrorsToRecord(result.error));
      return;
    }

    setErrors({});
    startTransition(async () => {
      const response = await createStudentProfile(result.data);

      if (!response.success) {
        setErrors({ form: response.message || "Failed to create profile" });
        return;
      }

      router.push("/complete-profile/success");
    });
  };

  return (
    <Card className="w-full border-emerald-200/80 bg-white/90 shadow-[0_24px_80px_-36px_rgba(15,118,110,0.5)] backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl text-slate-950">
          Complete student profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-7">
        <StepIndicator currentStep={currentStep} />

        {currentStep === 1 ? (
          <FieldBlock error={errors.phone} label="Phone Number">
            <Input
              id="phone"
              type="tel"
              placeholder="+8801XXXXXXXXX"
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
            />
          </FieldBlock>
        ) : null}

        {currentStep === 2 ? (
          <FieldBlock error={errors.address} label="Address">
            <Input
              id="address"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={(event) => updateField("address", event.target.value)}
              aria-invalid={Boolean(errors.address)}
            />
          </FieldBlock>
        ) : null}

        {currentStep === 3 ? (
          <div className="space-y-4">
            <FieldBlock error={errors.gradeLevel} label="Grade Level">
              <Select
                value={formData.gradeLevel}
                onValueChange={(value) => updateField("gradeLevel", value)}
              >
                <SelectTrigger aria-invalid={Boolean(errors.gradeLevel)}>
                  <SelectValue placeholder="Select your grade level" />
                </SelectTrigger>
                <SelectContent>
                  {gradeLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldBlock>
            <FieldBlock error={errors.school} label="School">
              <Input
                id="school"
                placeholder="Enter your school name"
                value={formData.school}
                onChange={(event) => updateField("school", event.target.value)}
                aria-invalid={Boolean(errors.school)}
              />
            </FieldBlock>
          </div>
        ) : null}

        {errors.form ? (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
            {errors.form}
          </p>
        ) : null}

        <div className="flex justify-between pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep((step) => step - 1)}
            disabled={currentStep === 1 || isPending}
          >
            Previous
          </Button>
          {currentStep < studentProfileSteps.length ? (
            <Button
              type="button"
              onClick={() => {
                if (validateStep(currentStep)) {
                  setCurrentStep((step) => step + 1);
                }
              }}
            >
              Next
            </Button>
          ) : (
            <Button type="button" onClick={submit} disabled={isPending}>
              {isPending ? "Submitting..." : "Complete Profile"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {studentProfileSteps.map((step) => (
        <div
          key={step.id}
          className={`rounded-2xl border px-3 py-2 text-sm ${
            step.id <= currentStep
              ? "border-emerald-300 bg-emerald-50 text-emerald-900"
              : "border-slate-200 bg-slate-50 text-slate-500"
          }`}
        >
          <span className="block text-xs font-semibold uppercase tracking-[0.18em]">
            Step {step.id}
          </span>
          {step.title}
        </div>
      ))}
    </div>
  );
}

function FieldBlock({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
