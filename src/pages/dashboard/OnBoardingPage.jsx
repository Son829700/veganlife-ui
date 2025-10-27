import React, { useState } from "react";
import Step1 from "../../components/onboarding/Step1";
import Step2 from "../../components/onboarding/Step2";
import Step3 from "../../components/onboarding/Step3";
import Step4 from "../../components/onboarding/Step4";
import Step5 from "../../components/onboarding/Step5";
import Step6 from "../../components/onboarding/Step6";
import Step7 from "../../components/onboarding/Step7";



export default function OnboardingPage() {
  // Quản lý bước hiện tại
  const [currentStep, setCurrentStep] = useState(1);

  // Lưu dữ liệu của tất cả các bước
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    // thêm các trường khác nếu cần
  });

  // Hàm cập nhật dữ liệu người dùng
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Điều hướng giữa các bước
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Render step tương ứng
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            data={formData}
            onChange={handleChange}
            onNext={handleNext}
          // Không cần onPrevious vì Step1 không có nút trở lại
          />
        );
      case 2:
        return (
          <Step2
            data={formData}
            onChange={handleChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <Step3
            data={formData}
            onChange={handleChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <Step4
            data={formData}
            onChange={handleChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <Step5
            data={formData}
            onChange={handleChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 6:
        return (
          <Step6
            data={formData}
            onChange={handleChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 7:
        return <Step7 onPrevious={handlePrevious} />;
      default:
        return <div>Đã hoàn tất!</div>; 
    }
  };

  return <div>{renderStep()}</div>;
}
