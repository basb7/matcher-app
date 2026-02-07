import { Box } from "@mui/material";
import Navbar from "@/components/layout/Navbar";
import {Welcome} from "@/components/home/welcome";
import {CategorySections} from "@/components/home/categorySections";
import {HowItWorks} from "@/components/home/howItworksSection";
import {FooterSection} from "@/components/home/footerSection";
import {cookies} from "next/headers";

async function isAuthenticated () {
  const cookieStore = await cookies();
  const sessionid = cookieStore.get('sessionid')?.value;

  return Boolean(sessionid)
}

export default async function Home() {
  const hasUserAuthenticated = await isAuthenticated()
  return (
    <Box component={"section"}>
      <Navbar isAuthenticated={hasUserAuthenticated} />
      <Welcome/>
      <CategorySections/>
      <HowItWorks/>
      <FooterSection/>
    </Box>
  );
}
