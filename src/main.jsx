import React from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import PricingSheet from "./PricingSheet.jsx";
createRoot(document.getElementById("root")).render(
  <>
    <PricingSheet />
    <Analytics />
  </>
);
