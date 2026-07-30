import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";

const cards = [
  {
    title: "Total Customers",
    value: "128",
  },
  {
    title: "Active Sites",
    value: "42",
  },
  {
    title: "Open Work Orders",
    value: "86",
  },
  {
    title: "Technicians",
    value: "15",
  },
];

function DashboardPage() {
  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid
            key={card.title}
            size={{ xs: 12, sm: 6, md: 3 }}
          >
            <Card
              elevation={4}
              sx={{
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                >
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid size={{ xs: 12 }}>
          <Card
            elevation={4}
            sx={{
              borderRadius: 3,
              minHeight: 350,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
              >
                Recent Work Orders
              </Typography>

              <Box
                sx={{
                  minHeight: 240,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "gray",
                }}
              >
                Work Orders Table Coming Soon...
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default DashboardPage;