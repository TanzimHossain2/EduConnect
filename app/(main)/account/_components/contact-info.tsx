"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { LucidePlus, LucideX } from "lucide-react";
import { updateContactInfo } from "@/app/actions/auth";
import { toast } from "sonner";

interface ContactInfoProps {
  email: string;
  phone: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    website?: string;
  };
}

const socialMediaOrder = [
  "twitter",
  "linkedin",
  "facebook",
  "website",
] as const;

const ContactInfo: React.FC<ContactInfoProps> = ({
  email,
  phone,
  socialMedia = {},
}) => {
  const [activeSocials, setActiveSocials] = useState<
    (keyof typeof socialMedia)[]
  >(() => {
    return socialMediaOrder.filter((key) => socialMedia && key in socialMedia);
  });

  const [phoneNumber, setPhoneNumber] = useState(phone || "");
  const [socialLinks, setSocialLinks] = useState<{
    [key in keyof typeof socialMedia]?: string;
  }>({
    ...socialMedia,
  });

  const addSocialField = () => {
    const nextSocial = socialMediaOrder.find(
      (social) => !activeSocials.includes(social)
    );
    if (nextSocial) {
      setActiveSocials([...activeSocials, nextSocial]);
    }
  };

  const removeSocialField = (social: keyof typeof socialMedia) => {
    setActiveSocials(activeSocials.filter((key) => key !== social));
    setSocialLinks((prev) => {
      const updated = { ...prev };
      delete updated[social];
      return updated;
    });
  };

  const handleInputChange = (
    social: keyof typeof socialMedia,
    value: string
  ) => {
    setSocialLinks({ ...socialLinks, [social]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contactData = {
      phone: phoneNumber,
      socialMedia: socialLinks,
    };

    try {
      const res = await updateContactInfo(email, contactData);

      if (res.error) {
        toast.error(res.error);
        return;
      } else {
        toast.success(res.message, { duration: 2000 });
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info:</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label className="mb-2 block">Phone No.:</Label>
          <Input
            name="phone"
            id="phone"
            type="text"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {activeSocials.map((social) => (
          <div key={social} className="flex items-center mb-4">
            <Label className="mb-2 block capitalize">{social}:</Label>
            <Input
              name={social}
              id={social}
              type="string"
              placeholder={`${social}:`}
              value={socialLinks[social] || ""}
              onChange={(e) => handleInputChange(social, e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => removeSocialField(social)}
            >
              <LucideX className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {activeSocials.length < socialMediaOrder.length && (
          <Button type="button" variant="ghost" onClick={addSocialField}>
            <LucidePlus className="w-4 h-4 mr-2" />
            Add Social Media
          </Button>
        )}

        <br />

        <Button type="submit" className="mt-5">
          Save
        </Button>
      </form>
    </div>
  );
};

export default ContactInfo;
