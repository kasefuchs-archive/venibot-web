import { Box } from "@mui/material";
import { ReactNode } from "react";

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: "12px", mt: 1 }}>{children}</Box>}
    </div>
  );
}
