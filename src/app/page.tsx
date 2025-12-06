'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, Sparkles, Wrench, ShieldCheck, Truck, Droplets, Wind, PlusCircle, Bot } from 'lucide-react';
import { AiChat } from '@/components/chat/ai-chat';
import { machines } from '@/lib/data';
import DashboardPage from '@/components/dashboard/dashboard-page';

const features = [
    {
        icon: <Lightbulb className="h-10 w-10 text-primary" />,
        title: "AI Predictive Maintenance",
        description: "Leverage AI to predict when your machines will need service, before they break down."
    },
    {
        icon: <Sparkles className="h-10 w-10 text-primary" />,
        title: "Intelligent Recommendations",
        description: "Get smart suggestions for cost-saving, estimated machine life, and critical alerts."
    },
     {
        icon: <Truck className="h-10 w-10 text-primary" />,
        title: "Vehicle Maintenance",
        description: "Keep your car, truck, or motorcycle in top condition with tailored predictions."
    },
    {
        icon: <Droplets className="h-10 w-10 text-primary" />,
        title: "Appliance Servicing",
        description: "From refrigerators to washing machines, know the right time for a tune-up."
    },
    {
        icon: <Wind className="h-10 w-10 text-primary" />,
        title: "HVAC & Systems",
        description: "Ensure your home's heating and cooling systems are running efficiently year-round."
    },
    {
        icon: <ShieldCheck className="h-10 w-10 text-primary" />,
        title: "Warranty Tracking",
        description: "Never lose track of warranty expirations for your valuable appliances."
    },
];

const benefits = [
    {
        title: "Save Money",
        description: "Avoid expensive, unexpected breakdowns by performing preventative maintenance at the right time. Our AI helps you budget for future costs.",
    },
    {
        title: "Increase Lifespan",
        description: "Properly maintained appliances and vehicles last longer. Homewise helps you protect your investments and get the most out of them.",
    },
    {
        title: "Reduce Stress",
        description: "Stop worrying about what might go wrong. Our app gives you a clear, proactive plan, so you can relax knowing your home is in good shape.",
    },
];


export default function LandingPage() {
  // If there are machines, show the dashboard. Otherwise, show the landing page.
  if (machines && machines.length > 0) {
    return <DashboardPage />;
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 text-center">
          <Wrench className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome to Homewise
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
              The smart way to manage maintenance for every machine in your life. Stop guessing, start predicting. Add your first machine to unlock AI-powered insights and never miss a maintenance task again.
          </p>
          <div className="mt-10">
              <Button asChild size="lg">
                  <Link href="/machines/add">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Your First Machine
                  </Link>
              </Button>
          </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
              <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight">A Smarter Way to Manage Your Home</h2>
                  <p className="mt-4 text-lg text-muted-foreground">Everything you need to take control of your home maintenance.</p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature) => (
                      <Card key={feature.title} className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm transition-transform hover:scale-105 hover:shadow-primary/10">
                         <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                           {feature.icon}
                         </div>
                          <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                          <p className="mt-2 text-muted-foreground">{feature.description}</p>
                      </Card>
                  ))}
              </div>
          </div>
      </div>
      
      {/* Benefits Section */}
      <div className="py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-10 text-center">
                {benefits.map(benefit => (
                    <div key={benefit.title}>
                        <h3 className="text-2xl font-bold text-primary">{benefit.title}</h3>
                        <p className="mt-2 text-muted-foreground">{benefit.description}</p>
                    </div>
                ))}
          </div>
      </div>

      {/* AI Chatbot Section */}
      <div className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Bot className="h-6 w-6" />
                Ask Our AI Assistant
              </CardTitle>
              <CardDescription>
                Have a question about appliance maintenance? Ask our AI assistant for tips, advice, or troubleshooting steps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AiChat />
            </CardContent>
          </Card>
        </div>
      </div>

       {/* How It Works Section */}
       <div className="py-20">
          <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
               <div className="mt-12 grid gap-10 md:grid-cols-3">
                  <div className="flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">1</div>
                      <h3 className="mt-5 text-xl font-semibold">Add Your Machine</h3>
                      <p className="mt-2 text-muted-foreground">Easily add any vehicle or appliance, from your car to your dishwasher.</p>
                  </div>
                   <div className="flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">2</div>
                      <h3 className="mt-5 text-xl font-semibold">Get AI Predictions</h3>
                      <p className="mt-2 text-muted-foreground">Run our AI to predict the next maintenance task, cost, and urgency.</p>
                  </div>
                   <div className="flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">3</div>
                      <h3 className="mt-5 text-xl font-semibold">Stay Organized</h3>
                      <p className="mt-2 text-muted-foreground">Receive reminders and view all your upcoming tasks on a clean dashboard.</p>
                  </div>
               </div>
               <div className="mt-16">
                  <Button asChild size="lg" variant="secondary">
                      <Link href="/machines/add">
                      Get Started for Free
                      </Link>
                  </Button>
              </div>
          </div>
      </div>
    </div>
  );
}
