import { AppBar as MuiAppBar, styled } from "@mui/material";

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));
