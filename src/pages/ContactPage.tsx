import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useComingSoon } from "@/hooks/useComingSoon.tsx";

const ContactPage = () => {
  const { showComingSoon } = useComingSoon();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@snusshop.com",
      description: "We respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+46 8 123 456 78",
      description: "Monday - Friday, 9AM - 6PM CET"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Drottninggatan 123, Stockholm, Sweden",
      description: "Showroom by appointment"
    },
    {
      icon: Clock,
      title: "Support Hours",
      content: "24/7 Online Support",
      description: "Live chat available"
    }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    showComingSoon();
  };

  const handleCallInstead = () => {
    showComingSoon();
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <section className="text-center py-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question about our products or need assistance with your order? 
            We're here to help and would love to hear from you.
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{info.title}</h3>
                      <p className="text-foreground font-medium">{info.content}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* FAQ Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm">Do you ship internationally?</h4>
                  <p className="text-sm text-muted-foreground">Yes, we ship to over 40 countries worldwide.</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm">What are your shipping times?</h4>
                  <p className="text-sm text-muted-foreground">2-5 business days for EU, 5-10 days elsewhere.</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Do you offer bulk discounts?</h4>
                  <p className="text-sm text-muted-foreground">Yes, contact us for bulk pricing options.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+46 70 123 45 67"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" size="lg" className="flex-1">
                      Send Message
                    </Button>
                    <Button type="button" variant="outline" size="lg" onClick={handleCallInstead}>
                      Call Instead
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Customer Support</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM CET</p>
                      <p>Saturday: 10:00 AM - 4:00 PM CET</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Order Processing</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Monday - Friday: 8:00 AM - 5:00 PM CET</p>
                      <p>Orders placed after hours are processed next business day</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;