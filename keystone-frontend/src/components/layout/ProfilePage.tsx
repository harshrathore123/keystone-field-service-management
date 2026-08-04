import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "./DashboardLayout";

function ProfilePage() {
  const navigate = useNavigate();

  const firstName = localStorage.getItem("firstName") || "User";
  const lastName = localStorage.getItem("lastName") || "";
  const email = localStorage.getItem("email") || "";
  const phone = localStorage.getItem("phone") || "Not Available";
  const role = localStorage.getItem("role") || "";

  return (
    <DashboardLayout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={5}
      >
        <Card
          elevation={8}
          sx={{
            width: {
              xs: "100%",
              sm: 500,
            },
            maxWidth: 520,
            borderRadius: 4,
            p: 1,
          }}
        >
          <CardContent>
            <Stack spacing={3} alignItems="center">
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "primary.main",
                  fontSize: 38,
                  fontWeight: 700,
                }}
              >
                {firstName.charAt(0).toUpperCase()}
              </Avatar>

              <Typography
                variant="h5"
                fontWeight={700}
                textAlign="center"
              >
                {firstName} {lastName}
              </Typography>

              <Chip
                label={role}
                color="primary"
                sx={{
                  fontWeight: 700,
                  minWidth: 100,
                }}
              />

              <Divider flexItem />

              <Stack
                spacing={2.5}
                width="100%"
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <PersonIcon color="primary" />

                  <Typography>
                    {firstName} {lastName}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <EmailIcon color="primary" />

                  <Typography
                    sx={{
                      wordBreak: "break-word",
                    }}
                  >
                    {email}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <PhoneIcon color="primary" />

                  <Typography>{phone}</Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <BadgeIcon color="primary" />

                  <Typography>{role}</Typography>
                </Stack>
              </Stack>

              <Divider flexItem />

              <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{
                  borderRadius: 3,
                  px: 5,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Back
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
}

export default ProfilePage;