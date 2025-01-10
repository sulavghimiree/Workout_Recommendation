import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Info } from "lucide-react";

const HealthPredictionApp = () => {
  const [step, setStep] = useState("input");
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    sex: "",
    diabetes: false,
    hypertension: false,
  });
  const [predictions, setPredictions] = useState(null);
  const [errors, setErrors] = useState({});

  const dietRecommendations = {
    0: "Vegetables: (Broccoli, Carrots, Spinach, Lettuce, Onion); Protein Intake: (Cheese, Cattoge cheese, Skim Milk, Law fat Milk, and Baru Nuts); Juice: (Fruit Juice, Aloe vera juice, Cold-pressed juice, and Watermelon juice)",
    1: "Vegetables: (Carrots, Sweet Potato, Lettuce); Protein Intake: (Red meats, poultry, fish, eggs, dairy products, legumes, and nuts); Juice: (Fruit juice, watermelon juice, carrot juice, apple juice and mango juice)",
    2: "Vegetables: (Carrots, Sweet Potato, and Lettuce); Protein Intake: (Red meats, poultry, fish, eggs, dairy products, legumes, and nuts); Juice: (Fruit juice, watermelon juice, carrot juice, apple juice and mango juice)",
    3: "Vegetables: (Garlic, Mushroom, Green Papper, Icebetg Lettuce); Protein Intake: (Baru Nuts, Beech Nuts, Hemp Seeds, Cheese Spandwich); Juice: (Apple Juice, Mango juice,and Beetroot juice)",
    4: "Vegetables: (Garlic, Roma Tomatoes, Capers and Iceberg Lettuce); Protein Intake: (Cheese Standwish, Baru Nuts, Beech Nuts, Squash Seeds, and Mixed Teff); Juice: (Apple juice, beetroot juice and mango juice)",
    5: "Vegetables: (Garlic, Roma Tomatoes, Capers, Green Papper, and Iceberg Lettuce); Protein Intake: (Cheese Sandwich, Baru Nuts, Beech Nuts, Squash Seeds, Mixed Teff, peanut butter, and jelly sandwich); Juice: (Apple juice, beetroot juice, and mango juice)",
    6: "Vegetables: (Garlic, mushroon, green papper and water chestnut);Protein Intake: ( Baru Nuts, Beech Nuts, and black walnut); Juice : (Apple juice, Mango, and Beetroot Juice)",
    7: "Vegetables: (Garlic, mushroon, green papper);Protein Intake: ( Baru Nuts, Beech Nuts, and Hemp Seeds); Juice : (Apple juice, Mango, and Beetroot Juice)",
    8: "Vegetables: (Mixed greens, cherry tomatoes, cucumbers, bell peppers, carrots, celery, bell peppers);Protein Intake: (Chicken, fish, tofu, or legumes); Juice : (Green juice,kale, spinach, cucumber, celery, and apple)",
    9: "Vegetables: (Tomatoes, Garlic, leafy greens, broccoli, carrots, and bell peppers); Protein Intake: (poultry, fish, tofu, legumes, and low-fat dairy products); Juice: (Apple juice, beetroot juice and mango juice)",
  };

  const exerciseRecommendations = {
    0: "Brisk walking, cycling, swimming, running , or dancing",
    1: "Squats, deadlifts, bench presses, and overhead presses",
    2: "Squats, yoga, deadlifts, bench presses, and overhead presses",
    3: "Walking, Yoga, Swimming",
    4: "Brisk walking, cycling, swimming, or dancing",
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.age || formData.age < 18 || formData.age > 80) {
      newErrors.age = "Age must be between 18 and 120";
    }
    if (!formData.weight || formData.weight < 30 || formData.weight > 150) {
      newErrors.weight = "Weight must be between 30 and 300 kg";
    }
    if (!formData.height || formData.height < 120 || formData.height > 250) {
      newErrors.height = "Height must be between 120 and 250 m";
    }
    if (!formData.sex) {
      newErrors.sex = "Please select your sex";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = {};
    let sex;
    let diabetes;
    let hypertension;
    const url = "https://workout-recommendation.onrender.com/predict";
    if (validateForm()) {
      try {
        if (formData.sex === "male") {
          sex = 1;
        } else {
          sex = 0;
        }

        if (formData.diabetes === true) {
          diabetes = 1;
        } else {
          diabetes = 0;
        }

        if (formData.hypertension === true) {
          hypertension = 1;
        } else {
          hypertension = 0;
        }

        form = {
          age: formData.age,
          weight: formData.weight,
          height: formData.height / 100,
          sex: sex,
          diabetes: diabetes,
          hypertension: hypertension,
        };

        const ressponse = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!ressponse.ok) {
          throw new Error("Failed to fetch predictions");
        }

        const responseData = await ressponse.json();
        console.log(responseData);

        console.log(formData);
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                diet: responseData.diet,
                exercise: responseData.exercise,
              }),
            1000
          )
        );
        setPredictions(response);
        setStep("results");
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    }
  };

  const renderTooltip = (text) => (
    <div className="group relative inline-block ml-2">
      <Info className="h-4 w-4 text-gray-500" />
      <div className="invisible group-hover:visible absolute z-10 w-48 p-2 mt-1 text-sm bg-gray-900 text-white rounded-md shadow-lg">
        {text}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {step === "input" ? (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-800">
                Diet and Exercise Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="age">
                    Age
                    {renderTooltip("Enter your age in years")}
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className={errors.age ? "border-red-500" : ""}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm">{errors.age}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">
                    Weight (kg)
                    {renderTooltip("Enter your weight in kilograms")}
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    className={errors.weight ? "border-red-500" : ""}
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm">{errors.weight}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">
                    Height (cm)
                    {renderTooltip("Enter your height in centimeters")}
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                    className={errors.height ? "border-red-500" : ""}
                  />
                  {errors.height && (
                    <p className="text-red-500 text-sm">{errors.height}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Sex</Label>
                  <RadioGroup
                    value={formData.sex}
                    onValueChange={(value) =>
                      setFormData({ ...formData, sex: value })
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                  {errors.sex && (
                    <p className="text-red-500 text-sm">{errors.sex}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="diabetes">Diabetes</Label>
                    <Switch
                      id="diabetes"
                      checked={formData.diabetes}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, diabetes: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="hypertension">Hypertension</Label>
                    <Switch
                      id="hypertension"
                      checked={formData.hypertension}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, hypertension: checked })
                      }
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Get Recommendations
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-gray-800">
                  Your Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Recommended Diet Plan
                  </h3>
                  <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-lg text-gray-800">
                      {dietRecommendations[predictions.diet]}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Recommended Exercise Plan
                  </h3>
                  <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-lg text-gray-800">
                      {exerciseRecommendations[predictions.exercise]}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setStep("input")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Start Over
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthPredictionApp;
