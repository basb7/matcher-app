import { Box } from "@mui/material";
import { getSession } from "@/actions/auth/session";
import { CategorySections } from "@/components/home/categorySections";
import { FooterSection } from "@/components/home/footerSection";
import { HowItWorks } from "@/components/home/howItworksSection";
import { Welcome } from "@/components/home/welcome";
import Navbar from "@/components/layout/Navbar";

export default async function Home() {
  const session = await getSession();

  return (
    <Box component={"section"}>
      <Navbar isAuthenticated={session} />
      <Welcome />
      <CategorySections />
      <HowItWorks />
      <FooterSection />
    </Box>
  );
}
