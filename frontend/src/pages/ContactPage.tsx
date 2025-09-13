import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useComingSoon } from "@/hooks/useComingSoon.tsx";
import { useTranslation } from "@/hooks/useTranslation.tsx";

const ContactPage = () => {
  const { showComingSoon } = useComingSoon();
  const { t } = useTranslation();
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
      title: t("contact.email.title"),
      content: "gesnusge@gmail.com",
      description: t("contact.email.desc")
    },
    {
      icon: Phone,
      title: t("contact.phone.title"),
      content: "+995 557 122 342",
      description: t("contact.phone.desc")
    },
    {
      icon: MapPin,
      title: t("contact.address.title"),
      content: t("contact.address.content"),
      description: t("contact.address.desc")
    },
    {
      icon: Clock,
      title: t("contact.hours.title"),
      content: t("contact.hours.content"),
      description: t("contact.hours.desc")
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
            {t("contact.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold mb-6">{t("contact.info")}</h2>
            
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
                <CardTitle className="text-lg">{t("contact.faq.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm">{t("contact.faq.shipping")}</h4>
                  <p className="text-sm text-muted-foreground">{t("contact.faq.shipping.answer")}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm">{t("contact.faq.time")}</h4>
                  <p className="text-sm text-muted-foreground">{t("contact.faq.time.answer")}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm">{t("contact.faq.bulk")}</h4>
                  <p className="text-sm text-muted-foreground">{t("contact.faq.bulk.answer")}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{t("contact.form.title")}</CardTitle>
                <p className="text-muted-foreground">
                  {t("contact.form.subtitle")}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t("contact.form.first_name")} *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t("contact.form.last_name")} *</Label>
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
                    <Label htmlFor="email">{t("contact.form.email")} *</Label>
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
                    <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+995 557 123 456"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("contact.form.subject")} *</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.form.message")} *</Label>
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
                      {t("contact.form.send")}
                    </Button>
                    <Button type="button" variant="outline" size="lg" onClick={handleCallInstead}>
                      {t("contact.form.call")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle>{t("contact.business_hours")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">{t("contact.support_hours")}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{t("contact.support_247")}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">{t("contact.office_hours")}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>08:00 — 03:00</p>
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