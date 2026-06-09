"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTutorProfile } from "@/server/profile/profile.service";
import {
  tutorProfileSchema,
  tutorProfileSteps,
  type TutorProfileInput,
  zodErrorsToRecord,
} from "@/validation/profile.validation";

type TutorProfileFormState = Omit<TutorProfileInput, "hourlyRate"> & {
  hourlyRate: string;
};

const initialFormData: TutorProfileFormState = {
  bio: "",
  subjects: [""],
  experience: "",
  education: "",
  hourlyRate: "",
  certifications: "",
};

export function TutorProfileForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] =
    useState<TutorProfileFormState>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const normalizedFormData = {
    ...formData,
    subjects: formData.subjects.map((subject) => subject.trim()).filter(Boolean),
  };

  const validateStep = (step: number) => {
    const stepConfig = tutorProfileSteps.find((item) => item.id === step);
    const result = tutorProfileSchema.safeParse(normalizedFormData);
    const allErrors = result.success ? {} : zodErrorsToRecord(result.error);
    const stepErrors = Object.fromEntries(
      Object.entries(allErrors).filter(([key]) =>
        stepConfig?.fields.includes(key as never),
      ),
    );

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const updateField = (
    field: keyof TutorProfileFormState,
    value: string | string[],
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const submit = () => {
    const result = tutorProfileSchema.safeParse(normalizedFormData);

    if (!result.success) {
      setErrors(zodErrorsToRecord(result.error));
      return;
    }

    setErrors({});
    startTransition(async () => {
      const response = await createTutorProfile(result.data);

      if (!response.success) {
        setErrors({ form: response.message || "Failed to create profile" });
        return;
      }

      router.push("/complete-profile/success");
    });
  };

  const updateSubject = (index: number, value: string) => {
    updateField(
      "subjects",
      formData.subjects.map((subject, subjectIndex) =>
        subjectIndex === index ? value : subject,
      ),
    );
  };

  return (
    <Card className="w-full border-amber-200/90 bg-white/90 shadow-[0_24px_80px_-36px_rgba(180,83,9,0.5)] backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl text-slate-950">
          Complete tutor profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-7">
        <StepIndicator currentStep={currentStep} />

        {currentStep === 1 ? (
          <div className="space-y-4">
            <FieldBlock error={errors.experience} label="Experience">
              <Textarea
                id="experience"
                placeholder="Describe your teaching experience..."
                value={formData.experience}
                onChange={(event) =>
                  updateField("experience", event.target.value)
                }
                rows={4}
              />
            </FieldBlock>
            <FieldBlock error={errors.education} label="Education">
              <Textarea
                id="education"
                placeholder="Describe your educational background..."
                value={formData.education}
                onChange={(event) => updateField("education", event.target.value)}
                rows={4}
              />
            </FieldBlock>
          </div>
        ) : null}

        {currentStep === 2 ? (
          <div className="space-y-4">
            <FieldBlock error={errors.subjects} label="Subjects">
              <div className="space-y-2">
                {formData.subjects.map((subject, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={subject}
                      onChange={(event) => updateSubject(index, event.target.value)}
                      placeholder="Enter a subject"
                    />
                    {formData.subjects.length > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          updateField(
                            "subjects",
                            formData.subjects.filter((_, item) => item !== index),
                          )
                        }
                      >
                        Remove
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  updateField("subjects", [...formData.subjects, ""])
                }
              >
                Add Subject
              </Button>
            </FieldBlock>
            <FieldBlock error={errors.hourlyRate} label="Hourly Rate (BDT)">
              <Input
                id="hourlyRate"
                type="number"
                placeholder="500"
                min="100"
                max="10000"
                value={formData.hourlyRate}
                onChange={(event) => updateField("hourlyRate", event.target.value)}
              />
            </FieldBlock>
          </div>
        ) : null}

        {currentStep === 3 ? (
          <div className="space-y-4">
            <FieldBlock label="Bio (Optional)">
              <Textarea
                id="bio"
                placeholder="Tell students about yourself..."
                value={formData.bio}
                onChange={(event) => updateField("bio", event.target.value)}
                rows={4}
              />
            </FieldBlock>
            <FieldBlock label="Certifications (Optional)">
              <Textarea
                id="certifications"
                placeholder="List your certifications..."
                value={formData.certifications}
                onChange={(event) =>
                  updateField("certifications", event.target.value)
                }
                rows={4}
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
          {currentStep < tutorProfileSteps.length ? (
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
      {tutorProfileSteps.map((step) => (
        <div
          key={step.id}
          className={`rounded-2xl border px-3 py-2 text-sm ${
            step.id <= currentStep
              ? "border-amber-300 bg-amber-50 text-amber-950"
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
