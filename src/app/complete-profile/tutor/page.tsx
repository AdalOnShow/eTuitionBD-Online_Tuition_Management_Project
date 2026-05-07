"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTutorProfile } from "@/server/profile/profile.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TutorProfilePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    bio: "",
    subjects: [""],
    experience: "",
    education: "",
    hourlyRate: "",
    certifications: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.experience.trim()) {
        newErrors.experience = "Experience is required";
      }
      if (!formData.education.trim()) {
        newErrors.education = "Education is required";
      }
    }

    if (step === 2) {
      if (
        formData.subjects.length === 0 ||
        formData.subjects.every((s) => !s.trim())
      ) {
        newErrors.subjects = "At least one subject is required";
      }
      if (!formData.hourlyRate || Number(formData.hourlyRate) < 100) {
        newErrors.hourlyRate = "Hourly rate must be at least 100 BDT";
      }
      if (Number(formData.hourlyRate) > 10000) {
        newErrors.hourlyRate = "Hourly rate must not exceed 10,000 BDT";
      }
    }

    if (step === 3) {
      // Bio and certifications are optional
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, ""],
    });
  };

  const updateSubject = (index: number, value: string) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = value;
    setFormData({
      ...formData,
      subjects: newSubjects,
    });
  };

  const removeSubject = (index: number) => {
    const newSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      subjects: newSubjects,
    });
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      const result = await createTutorProfile({
        ...formData,
        hourlyRate: Number(formData.hourlyRate),
        subjects: formData.subjects.filter((s) => s.trim()),
      });

      if (result.success) {
        router.push("/complete-profile/success");
      } else {
        setErrors({ form: result.message || "Failed to create profile" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Textarea
                id="experience"
                placeholder="Describe your teaching experience..."
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className={errors.experience ? "border-red-500" : ""}
                rows={4}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">{errors.experience}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                placeholder="Describe your educational background..."
                value={formData.education}
                onChange={(e) =>
                  setFormData({ ...formData, education: e.target.value })
                }
                className={errors.education ? "border-red-500" : ""}
                rows={4}
              />
              {errors.education && (
                <p className="text-sm text-red-500">{errors.education}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Subjects</Label>
              {formData.subjects.map((subject, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={subject}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateSubject(index, e.target.value)
                    }
                    placeholder="Enter a subject"
                    className={errors.subjects ? "border-red-500" : ""}
                  />
                  {formData.subjects.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSubject(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addSubject}
                className="mt-2"
              >
                Add Subject
              </Button>
              {errors.subjects && (
                <p className="text-sm text-red-500">{errors.subjects}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (BDT)</Label>
              <Input
                id="hourlyRate"
                type="number"
                placeholder="500"
                value={formData.hourlyRate}
                onChange={(e) =>
                  setFormData({ ...formData, hourlyRate: e.target.value })
                }
                className={errors.hourlyRate ? "border-red-500" : ""}
                min="100"
                max="10000"
              />
              {errors.hourlyRate && (
                <p className="text-sm text-red-500">{errors.hourlyRate}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                id="bio"
                placeholder="Tell students about yourself..."
                value={formData.bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications (Optional)</Label>
              <Textarea
                id="certifications"
                placeholder="List your certifications..."
                value={formData.certifications}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, certifications: e.target.value })
                }
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Complete Your Tutor Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step <= currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
            ))}
            <div className="flex-1 h-1 bg-gray-200 mx-2" />
          </div>

          {/* Step Content */}
          <div className="min-h-[300px]">{renderStep()}</div>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button onClick={nextStep}>Next</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Complete Profile"}
              </Button>
            )}
          </div>

          {errors.form && (
            <p className="text-sm text-red-500 mt-4">{errors.form}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
