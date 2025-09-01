import { useState } from "react";
import { ConsumerLayout } from "@/components/layouts/ConsumerLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Zap, Leaf, BarChart3 } from "lucide-react";
import { toast } from "sonner";

export default function CropAnalysis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        cropType: "Tomato",
        variety: "Cherry Tomato",
        ripeness: "85% Ripe",
        quality: "Premium",
        nutritionalValue: {
          vitamin_c: "High",
          lycopene: "Very High",
          potassium: "Moderate",
          folate: "Good"
        },
        freshness: "Excellent",
        shelfLife: "5-7 days",
        suggestions: [
          "Perfect for immediate consumption",
          "Rich in antioxidants",
          "Store at room temperature for best flavor",
          "Great for salads and cooking"
        ],
        confidence: 94
      });
      
      setAnalyzing(false);
      toast.success("Analysis complete!");
    }, 3000);
  };

  const sampleAnalyses = [
    {
      crop: "Organic Carrots",
      quality: "Premium",
      nutrition: "High in Beta-Carotene",
      confidence: 96
    },
    {
      crop: "Fresh Spinach",
      quality: "Excellent",
      nutrition: "Rich in Iron & Vitamins",
      confidence: 91
    },
    {
      crop: "Red Bell Pepper",
      quality: "Good",
      nutrition: "High Vitamin C Content",
      confidence: 88
    }
  ];

  return (
    <ConsumerLayout currentPage="Crop Analysis">
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Crop Analysis 🔬</h1>
            <p className="text-muted-foreground">
              Upload photos of produce to get detailed nutritional analysis and quality assessment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Upload & Analyze
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img
                        src={selectedImage}
                        alt="Selected produce"
                        className="mx-auto max-h-48 rounded-lg"
                      />
                      <Button
                        onClick={analyzeImage}
                        disabled={analyzing}
                        className="w-full"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        {analyzing ? "Analyzing..." : "Analyze with AI"}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload or take a photo of your produce
                        </p>
                        <div className="flex gap-2 justify-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload">
                            <Button variant="outline" className="cursor-pointer">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Photo
                            </Button>
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="camera-capture"
                          />
                          <label htmlFor="camera-capture">
                            <Button variant="outline" className="cursor-pointer">
                              <Camera className="h-4 w-4 mr-2" />
                              Take Photo
                            </Button>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {analyzing && (
                  <Alert>
                    <Zap className="h-4 w-4" />
                    <AlertDescription>
                      AI is analyzing your image... This may take a few seconds.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysisResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{analysisResult.cropType}</h3>
                      <Badge variant="secondary">
                        {analysisResult.confidence}% Confidence
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Variety</p>
                        <p className="font-medium">{analysisResult.variety}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quality</p>
                        <p className="font-medium">{analysisResult.quality}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ripeness</p>
                        <p className="font-medium">{analysisResult.ripeness}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Shelf Life</p>
                        <p className="font-medium">{analysisResult.shelfLife}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Leaf className="h-4 w-4" />
                        Nutritional Value
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Vitamin C: <span className="font-medium">{analysisResult.nutritionalValue.vitamin_c}</span></div>
                        <div>Lycopene: <span className="font-medium">{analysisResult.nutritionalValue.lycopene}</span></div>
                        <div>Potassium: <span className="font-medium">{analysisResult.nutritionalValue.potassium}</span></div>
                        <div>Folate: <span className="font-medium">{analysisResult.nutritionalValue.folate}</span></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {analysisResult.suggestions.map((suggestion: string, index: number) => (
                          <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Upload an image to see detailed analysis results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sample Analyses */}
          <Card className="shadow-card mt-6">
            <CardHeader>
              <CardTitle>Recent Community Analyses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sampleAnalyses.map((analysis, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium">{analysis.crop}</h4>
                    <p className="text-sm text-muted-foreground">{analysis.quality}</p>
                    <p className="text-sm text-primary">{analysis.nutrition}</p>
                    <Badge variant="outline" className="mt-2">
                      {analysis.confidence}% Confidence
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ConsumerLayout>
  );
}