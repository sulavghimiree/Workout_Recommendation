import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Info, ChevronDown, ChevronUp } from "lucide-react";

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

  const [expandedSections, setExpandedSections] = useState({
    vegetables: false,
    protein: false,
    beverages: false,
    schedule: false,
    benefits: false,
    tips: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const dietRecommendations = {
    0: {
      Vegetables: ["Broccoli", "Carrots", "Spinach", "Lettuce", "Onion"],
      Protein: [
        "Cheese",
        "Cottage cheese",
        "Skim Milk",
        "Low-fat Milk",
        "Baru Nuts",
      ],
      Juice: [
        "Fruit Juice",
        "Aloe vera juice",
        "Cold-pressed juice",
        "Watermelon juice",
      ],
    },
    1: {
      Vegetables: ["Carrots", "Sweet Potato", "Lettuce"],
      Protein: [
        "Red meats",
        "Poultry",
        "Fish",
        "Eggs",
        "Dairy products",
        "Legumes",
        "Nuts",
      ],
      Juice: [
        "Fruit juice",
        "Watermelon juice",
        "Carrot juice",
        "Apple juice",
        "Mango juice",
      ],
    },
    2: {
      Vegetables: ["Carrots", "Sweet Potato", "Lettuce"],
      Protein: [
        "Red meats",
        "Poultry",
        "Fish",
        "Eggs",
        "Dairy products",
        "Legumes",
        "Nuts",
      ],
      Juice: [
        "Fruit juice",
        "Watermelon juice",
        "Carrot juice",
        "Apple juice",
        "Mango juice",
      ],
    },
    3: {
      Vegetables: ["Garlic", "Mushroom", "Green Pepper", "Iceberg Lettuce"],
      Protein: ["Baru Nuts", "Beech Nuts", "Hemp Seeds", "Cheese Sandwich"],
      Juice: ["Apple juice", "Mango juice", "Beetroot juice"],
    },
    4: {
      Vegetables: ["Garlic", "Roma Tomatoes", "Capers", "Iceberg Lettuce"],
      Protein: [
        "Cheese Sandwich",
        "Baru Nuts",
        "Beech Nuts",
        "Squash Seeds",
        "Mixed Teff",
      ],
      Juice: ["Apple juice", "Beetroot juice", "Mango juice"],
    },
    5: {
      Vegetables: [
        "Garlic",
        "Roma Tomatoes",
        "Capers",
        "Green Pepper",
        "Iceberg Lettuce",
      ],
      Protein: [
        "Cheese Sandwich",
        "Baru Nuts",
        "Beech Nuts",
        "Squash Seeds",
        "Mixed Teff",
        "Peanut butter",
        "Jelly sandwich",
      ],
      Juice: ["Apple juice", "Beetroot juice", "Mango juice"],
    },
    6: {
      Vegetables: ["Garlic", "Mushroom", "Green Pepper", "Water Chestnut"],
      Protein: ["Baru Nuts", "Beech Nuts", "Black Walnut"],
      Juice: ["Apple juice", "Mango juice", "Beetroot juice"],
    },
    7: {
      Vegetables: ["Garlic", "Mushroom", "Green Pepper"],
      Protein: ["Baru Nuts", "Beech Nuts", "Hemp Seeds"],
      Juice: ["Apple juice", "Mango juice", "Beetroot juice"],
    },
    8: {
      Vegetables: [
        "Mixed greens",
        "Cherry tomatoes",
        "Cucumbers",
        "Bell peppers",
        "Carrots",
        "Celery",
      ],
      Protein: ["Chicken", "Fish", "Tofu", "Legumes"],
      Juice: ["Green juice", "Kale", "Spinach", "Cucumber", "Celery", "Apple"],
    },
    9: {
      Vegetables: [
        "Tomatoes",
        "Garlic",
        "Leafy greens",
        "Broccoli",
        "Carrots",
        "Bell peppers",
      ],
      Protein: ["Poultry", "Fish", "Tofu", "Legumes", "Low-fat dairy products"],
      Juice: ["Apple juice", "Beetroot juice", "Mango juice"],
    },
  };

  const exerciseRecommendations = {
    0: {
      Exercises: ["Brisk walking", "Cycling", "Swimming", "Running", "Dancing"],
    },
    1: {
      Exercises: ["Squats", "Deadlifts", "Bench presses", "Overhead presses"],
    },
    2: {
      Exercises: [
        "Squats",
        "Yoga",
        "Deadlifts",
        "Bench presses",
        "Overhead presses",
      ],
    },
    3: {
      Exercises: ["Walking", "Yoga", "Swimming"],
    },
    4: {
      Exercises: ["Brisk walking", "Cycling", "Swimming", "Dancing"],
    },
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
      newErrors.height = "Height must be between 120 and 250 cm";
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
            100
          )
        );
        setPredictions(response);
        setStep("results");
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    }
  };

  const renderExpandableSection = (title, items, section) => (
    <div className="border rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-semibold text-gray-700">{title}</span>
        {expandedSections[section] ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      {expandedSections[section] && (
        <div className="p-4 bg-white">
          <ul className="list-disc list-inside space-y-2">
            {items.map((item, index) => (
              <li key={index} className="text-gray-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

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
                  Your Personalized Health Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
                    Recommended Diet Plan:
                  </h3>

                  {renderExpandableSection(
                    "Recommended Vegetables",
                    dietRecommendations[predictions.diet].Vegetables,
                    "vegetables"
                  )}

                  {renderExpandableSection(
                    "Protein Sources",
                    dietRecommendations[predictions.diet].Protein,
                    "protein"
                  )}

                  {renderExpandableSection(
                    "Juice",
                    dietRecommendations[predictions.diet].Juice,
                    "beverages"
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
                    Exercise Plan:
                  </h3>

                  {renderExpandableSection(
                    "Daily Schedule",
                    exerciseRecommendations[predictions.exercise].Exercises,
                    "schedule"
                  )}
                </div>

                <Button
                  onClick={() => {
                    setStep("input");
                    setExpandedSections({
                      vegetables: false,
                      protein: false,
                      beverages: false,
                      schedule: false,
                      benefits: false,
                      tips: false,
                    });
                  }}
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
