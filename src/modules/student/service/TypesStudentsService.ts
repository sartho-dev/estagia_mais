import { Student } from "../schema/Student.schema";

export type StudentCreatedResult = {
  id: string;
  cpf: string;
  name: string;
  email: string;
  birthDate: string;
  // RF03: one or more phone numbers are required at sign-up
  phones: string[];
};

export type StudentProfileResult = {
  id: string;
  cpf: string;
  name: string;
  email: string;
  birthDate: string;
  phones: string[];
  bio: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  languages: { name: string; level: string }[];
  experiences: {
    company: string;
    role: string;
    startDate: string;
    endDate: string | null;
    description: string | null;
  }[];
  skills: string[];
  certifications: {
    name: string;
    issuer: string;
    issuedAt: string;
    expiresAt: string | null;
    credentialUrl: string | null;
  }[];
};
