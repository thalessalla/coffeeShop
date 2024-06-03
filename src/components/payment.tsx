import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

import Money from "./paymentsMethods/money";
import Debit from "./paymentsMethods/debit";
import Credit from "./paymentsMethods/credit";

function Payment() {
  const [valueTab, setValueTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  return (
    <>
      <hr className="mt-2 border-zinc-300" />
      <Box className="w-full mt-2">
        <Tabs value={valueTab} onChange={handleChange}>
          <Tab label="Crédito" />
          <Tab label="Débito" />
          <Tab label="Dinheiro" />
        </Tabs>

        <TabPanel value={valueTab} index={0}>
          <Credit />
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <Debit />
        </TabPanel>
        <TabPanel value={valueTab} index={2}>
          <Money />
        </TabPanel>
      </Box>
    </>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default Payment;
