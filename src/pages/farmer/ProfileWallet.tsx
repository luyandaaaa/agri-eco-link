import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  User, 
  Wallet, 
  CreditCard, 
  Download, 
  Upload,
  MapPin,
  Phone,
  Mail,
  Camera,
  DollarSign,
  History,
  TrendingUp,
  Plus,
  Save,
  X,
  FileText,
  RefreshCw
} from "lucide-react";
import { FarmerLayout } from "@/components/layouts/FarmerLayout";

export default function ProfileWallet() {
  const [farmer, setFarmer] = useState({
    name: "Lindiwe Mthembu",
    email: "lindiwe.mthembu@farm2city.co.za",
    phone: "+27 82 999 8888",
    farmName: "Mthembu Family Farm",
    location: "Eastern Cape",
    address: "Plot 45, Rural Road R72, Eastern Cape, 5200",
    bio: "Third-generation farmer specializing in organic vegetables and sustainable farming practices. Passionate about connecting local communities with fresh, healthy produce.",
    established: "1987",
    farmSize: "15 hectares",
    certifications: ["Organic Certified", "Fair Trade"],
    specialties: ["Organic Vegetables", "Heritage Seeds", "Sustainable Farming"],
    profilePicture: null
  });

  const [creditReport, setCreditReport] = useState({
    score: 85,
    status: "Good",
    lastUpdated: "2024-01-15",
    onTimeDeliveries: 98,
    customerRatings: 4.8,
    platformActivity: "8 months",
    paymentHistory: "Excellent",
    totalTransactions: 45,
    totalCompletedSales: 142,
    totalValueSold: 24580.50,
    averagePaymentTime: 2.3,
    refundsDisputes: 2,
    activeSince: "2023-05-15",
    paymentMethod: "Bank Transfer",
    verifiedBankAccount: true,
    missedDeliveries: 3,
    creditworthinessSummary: "Reliable farmer with consistent delivery and payment history",
    recommendation: "Low-risk borrower suitable for agricultural loans up to R50,000"
  });

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFarmer({...farmer, profilePicture: e.target?.result as string});
        toast({
          title: "Profile Picture Updated",
          description: "Your profile picture has been successfully updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateCreditScore = () => {
    // Calculate score based on transaction metrics out of 100
    let score = 0;
    
    // On-time deliveries (30%)
    score += (creditReport.onTimeDeliveries / 100) * 30;
    
    // Customer ratings (20%)
    score += (creditReport.customerRatings / 5) * 20;
    
    // Payment history (25%)
    const paymentScore = creditReport.paymentHistory === "Excellent" ? 25 : creditReport.paymentHistory === "Good" ? 20 : 15;
    score += paymentScore;
    
    // Low refunds/disputes (15%)
    const disputeScore = creditReport.refundsDisputes <= 2 ? 15 : creditReport.refundsDisputes <= 5 ? 10 : 5;
    score += disputeScore;
    
    // Verified bank account (10%)
    score += creditReport.verifiedBankAccount ? 10 : 0;
    
    return Math.min(Math.round(score), 100); // Scale to 100 max
  };

  const handleGenerateNewCreditReport = () => {
    const newScore = calculateCreditScore();
    const newStatus = newScore >= 80 ? "Excellent" : newScore >= 60 ? "Good" : newScore >= 40 ? "Fair" : "Poor";
    
    setCreditReport({
      ...creditReport,
      score: newScore,
      status: newStatus,
      lastUpdated: new Date().toISOString().split('T')[0],
      creditworthinessSummary: newScore >= 80 ? 
        "Excellent farmer with outstanding delivery and payment history" :
        newScore >= 60 ?
        "Reliable farmer with consistent delivery and payment history" :
        newScore >= 40 ? 
        "Moderate risk farmer with room for improvement" :
        "High risk farmer requiring financial support",
      recommendation: newScore >= 80 ?
        "Excellent borrower suitable for premium agricultural loans up to R100,000" :
        newScore >= 60 ?
        "Low-risk borrower suitable for agricultural loans up to R50,000" :
        newScore >= 40 ?
        "Moderate-risk borrower suitable for secured loans up to R25,000" :
        "High-risk borrower requiring collateral for loans up to R10,000"
    });
    
    toast({
      title: "Credit Report Generated",
      description: "Your new credit report has been generated successfully.",
    });
  };

  const [showFullReport, setShowFullReport] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Document Uploaded",
        description: `${file.name} has been uploaded successfully for verification.`,
      });
    }
  };

  const handleBankingUpdate = () => {
    setShowBankingForm(false);
    toast({
      title: "Banking Details Updated",
      description: "Your banking information has been updated successfully.",
    });
  };

  const handlePersonalInfoSave = () => {
    setShowPersonalForm(false);
    toast({
      title: "Personal Information Saved",
      description: "Your personal information has been saved successfully.",
    });
  };

  const handleDownloadCreditReport = () => {
    const creditReportContent = `
FARM2CITY CREDIT REPORT
=======================

Farmer: ${farmer.name}
Farm: ${farmer.farmName}
Report Date: ${new Date().toLocaleDateString()}

CREDIT SCORE: ${creditReport.score}/100
Credit Status: ${creditReport.status}

CREDITWORTHINESS ASSESSMENT
===========================
${creditReport.creditworthinessSummary}

FINANCIAL INSTITUTION RECOMMENDATION
====================================
${creditReport.recommendation}

TRANSACTION METRICS
==================
- Total completed sales: ${creditReport.totalCompletedSales}
- Total value of produce sold: R${creditReport.totalValueSold.toFixed(2)}
- Average payment time from buyers: ${creditReport.averagePaymentTime} days
- Refunds or disputes: ${creditReport.refundsDisputes}
- Active on platform since: ${creditReport.activeSince}
- Payment method: ${creditReport.paymentMethod}
- Verified bank account: ${creditReport.verifiedBankAccount ? 'Yes' : 'No'}
- Missed deliveries: ${creditReport.missedDeliveries}

PERFORMANCE METRICS
==================
- On-time deliveries: ${creditReport.onTimeDeliveries}%
- Customer ratings: ${creditReport.customerRatings}/5
- Platform activity: ${creditReport.platformActivity}
- Payment history: ${creditReport.paymentHistory}
- Total transactions: ${creditReport.totalTransactions}

Generated on: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([creditReportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farm2city-credit-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast({
      title: "Credit Report Downloaded",
      description: "Your credit report has been downloaded successfully.",
    });
  };

  const handleDownloadStatement = () => {
    // Create PDF content
    const pdfContent = `
FARM2CITY FINANCIAL STATEMENT
==============================

Farmer: ${farmer.name}
Farm: ${farmer.farmName}
Statement Period: ${new Date().toLocaleDateString()}

ACCOUNT SUMMARY
===============
Available Balance: R${wallet.balance.toFixed(2)}
Pending Payments: R${wallet.pendingPayments.toFixed(2)}
Total Earnings: R${wallet.totalEarnings.toFixed(2)}
Monthly Earnings: R${wallet.monthlyEarnings.toFixed(2)}

TRANSACTION HISTORY
==================
${transactions.map(t => 
  `${t.date} | ${t.description} | ${t.amount > 0 ? '+' : ''}R${t.amount.toFixed(2)} | ${t.status}`
).join('\n')}

CREDIT REPORT SUMMARY
====================
Credit Score: ${creditReport.score}/850
Status: ${creditReport.status}
Total Completed Sales: ${creditReport.totalCompletedSales}
Total Value Sold: R${creditReport.totalValueSold.toFixed(2)}
Average Payment Time: ${creditReport.averagePaymentTime} days
Refunds/Disputes: ${creditReport.refundsDisputes}
On-time Deliveries: ${creditReport.onTimeDeliveries}%

Generated on: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farm2city-statement-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast({
      title: "Statement Downloaded",
      description: "Your financial statement has been downloaded successfully.",
    });
  };

  const [wallet] = useState({
    balance: 3420.50,
    pendingPayments: 637.50,
    totalEarnings: 12540.00,
    monthlyEarnings: 3420.50,
    lastWithdrawal: "2024-01-10"
  });

  const [transactions] = useState([
    {
      id: "TXN-001",
      type: "payment_received",
      amount: 387.50,
      description: "Order #ORD-001 - Sipho's Restaurant",
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: "TXN-002", 
      type: "withdrawal",
      amount: -500.00,
      description: "Bank Transfer to Standard Bank",
      date: "2024-01-10",
      status: "completed"
    },
    {
      id: "TXN-003",
      type: "payment_received", 
      amount: 250.00,
      description: "Order #ORD-002 - Green Market Co-op",
      date: "2024-01-08",
      status: "completed"
    }
  ]);

  const [bankDetails, setBankDetails] = useState({
    bankName: "Standard Bank",
    accountHolder: "Lindiwe Mthembu",
    accountNumber: "****1234",
    branchCode: "051001"
  });

  const [showBankingForm, setShowBankingForm] = useState(false);
  const [showPersonalForm, setShowPersonalForm] = useState(true);

  return (
    <FarmerLayout currentPage="Profile & Wallet">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Profile & Wallet 👤</h1>
          <p className="text-muted-foreground">
            Manage your farm profile and financial information
          </p>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">R{wallet.balance.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">R{wallet.pendingPayments.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Pending Payments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">R{wallet.monthlyEarnings.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-glow/10 rounded-lg">
                  <History className="h-6 w-6 text-primary-glow" />
                </div>
                <div>
                  <p className="text-2xl font-bold">R{wallet.totalEarnings.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Farm Profile</TabsTrigger>
            <TabsTrigger value="wallet">Digital Wallet</TabsTrigger>
            <TabsTrigger value="banking">Banking Details</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-card lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Personal Information
                    {!showPersonalForm && (
                      <Button variant="outline" size="sm" onClick={() => setShowPersonalForm(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {showPersonalForm ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={farmer.name}
                            onChange={(e) => setFarmer({...farmer, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="farmName">Farm Name</Label>
                          <Input 
                            id="farmName" 
                            value={farmer.farmName}
                            onChange={(e) => setFarmer({...farmer, farmName: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email"
                            value={farmer.email}
                            onChange={(e) => setFarmer({...farmer, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={farmer.phone}
                            onChange={(e) => setFarmer({...farmer, phone: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="established">Farm Established</Label>
                          <Input 
                            id="established" 
                            value={farmer.established}
                            onChange={(e) => setFarmer({...farmer, established: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="farmSize">Farm Size</Label>
                          <Input 
                            id="farmSize" 
                            value={farmer.farmSize}
                            onChange={(e) => setFarmer({...farmer, farmSize: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Farm Address</Label>
                        <Input 
                          id="address" 
                          value={farmer.address}
                          onChange={(e) => setFarmer({...farmer, address: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Farm Bio</Label>
                        <Textarea 
                          id="bio" 
                          value={farmer.bio}
                          onChange={(e) => setFarmer({...farmer, bio: e.target.value})}
                          rows={4}
                        />
                      </div>
                      
                      <Button className="w-full md:w-auto" onClick={handlePersonalInfoSave}>
                        Save Profile
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Full Name</p>
                          <p className="font-medium">{farmer.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Farm Name</p>
                          <p className="font-medium">{farmer.farmName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{farmer.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{farmer.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Farm Established</p>
                          <p className="font-medium">{farmer.established}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Farm Size</p>
                          <p className="font-medium">{farmer.farmSize}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Farm Address</p>
                        <p className="font-medium">{farmer.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Farm Bio</p>
                        <p className="font-medium">{farmer.bio}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Profile Photo</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-4xl overflow-hidden">
                      {farmer.profilePicture ? (
                        <img 
                          src={farmer.profilePicture} 
                          alt="Profile" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span>👩🏿‍🌾</span>
                      )}
                    </div>
                    <input
                      type="file"
                      id="profile-picture"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => document.getElementById('profile-picture')?.click()}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Specialties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {farmer.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="mr-2">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Specialty
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {farmer.certifications.map((cert, index) => (
                        <Badge key={index} variant="default" className="mr-2">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Certificate
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wallet">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Withdraw Funds
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center gap-2"
                    onClick={() => setShowTransactionHistory(true)}
                  >
                    <History className="h-4 w-4" />
                    View Transaction History
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center gap-2"
                    onClick={handleDownloadStatement}
                  >
                    <Download className="h-4 w-4" />
                    Download Statement
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${transaction.amount > 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                            {transaction.amount > 0 ? '+' : ''}R{Math.abs(transaction.amount).toFixed(2)}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="banking">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Banking Information
                  {!showBankingForm && (
                    <Button variant="outline" size="sm" onClick={() => setShowBankingForm(true)}>
                      Edit Details
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {showBankingForm ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input 
                          id="bankName" 
                          value={bankDetails.bankName}
                          onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="accountHolder">Account Holder</Label>
                        <Input 
                          id="accountHolder" 
                          value={bankDetails.accountHolder}
                          onChange={(e) => setBankDetails({...bankDetails, accountHolder: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input 
                          id="accountNumber" 
                          value={bankDetails.accountNumber}
                          onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="branchCode">Branch Code</Label>
                        <Input 
                          id="branchCode" 
                          value={bankDetails.branchCode}
                          onChange={(e) => setBankDetails({...bankDetails, branchCode: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Secure Banking</p>
                        <p className="text-sm text-muted-foreground">Your banking details are encrypted and secure</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={handleBankingUpdate}>
                        Update Banking Details
                      </Button>
                      <Button variant="outline" onClick={() => setShowBankingForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Bank Name</p>
                        <p className="font-medium">{bankDetails.bankName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Account Holder</p>
                        <p className="font-medium">{bankDetails.accountHolder}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Account Number</p>
                        <p className="font-medium">{bankDetails.accountNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Branch Code</p>
                        <p className="font-medium">{bankDetails.branchCode}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Secure Banking</p>
                        <p className="text-sm text-muted-foreground">Your banking details are encrypted and secure</p>
                      </div>
                    </div>
                    
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Account
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Identity Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <div>
                      <p className="font-medium">South African ID</p>
                      <p className="text-sm text-muted-foreground">Verified</p>
                    </div>
                    <Badge variant="default">✓ Verified</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Farm Registration</p>
                      <p className="text-sm text-muted-foreground">Upload farm registration documents</p>
                    </div>
                    <div>
                      <input
                        type="file"
                        id="farm-registration"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleDocumentUpload}
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('farm-registration')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Credit Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-primary mb-2">{creditReport.score}</div>
                    <p className="text-sm text-muted-foreground">{creditReport.status} Credit Score</p>
                    <p className="text-xs text-muted-foreground">Last updated: {creditReport.lastUpdated}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>On-time deliveries:</span>
                      <span className="font-medium">{creditReport.onTimeDeliveries}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer ratings:</span>
                      <span className="font-medium">{creditReport.customerRatings}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform activity:</span>
                      <span className="font-medium">{creditReport.platformActivity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment history:</span>
                      <span className="font-medium">{creditReport.paymentHistory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total transactions:</span>
                      <span className="font-medium">{creditReport.totalTransactions}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setShowFullReport(true)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Report
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleGenerateNewCreditReport}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Full Credit Report Modal */}
        {showFullReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Detailed Credit Report</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowFullReport(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div className="text-center p-6 bg-primary/10 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">{creditReport.score}/100</div>
                    <p className="text-lg font-semibold">{creditReport.status} Credit Score</p>
                    <p className="text-sm text-muted-foreground mt-2">{creditReport.creditworthinessSummary}</p>
                    <p className="text-sm text-primary mt-2 font-medium">{creditReport.recommendation}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Transaction Metrics</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total completed sales:</span>
                          <span className="font-medium">{creditReport.totalCompletedSales}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total value sold:</span>
                          <span className="font-medium">R{creditReport.totalValueSold.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average payment time:</span>
                          <span className="font-medium">{creditReport.averagePaymentTime} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Refunds/disputes:</span>
                          <span className="font-medium">{creditReport.refundsDisputes}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Platform Activity</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Active since:</span>
                          <span className="font-medium">{creditReport.activeSince}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment method:</span>
                          <span className="font-medium">{creditReport.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Verified bank account:</span>
                          <span className="font-medium">{creditReport.verifiedBankAccount ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Missed deliveries:</span>
                          <span className="font-medium">{creditReport.missedDeliveries}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Performance Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{creditReport.onTimeDeliveries}%</div>
                        <p className="text-sm text-muted-foreground">On-time Deliveries</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{creditReport.customerRatings}/5</div>
                        <p className="text-sm text-muted-foreground">Customer Rating</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{creditReport.totalTransactions}</div>
                        <p className="text-sm text-muted-foreground">Total Transactions</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1" onClick={handleDownloadCreditReport}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" onClick={handleGenerateNewCreditReport}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction History Modal */}
        {showTransactionHistory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Transaction History</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowTransactionHistory(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">Transaction ID: {transaction.id}</p>
                        <p className="text-sm text-muted-foreground">Date: {transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${transaction.amount > 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                          {transaction.amount > 0 ? '+' : ''}R{Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={handleDownloadStatement}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Statement
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </FarmerLayout>
  );
}