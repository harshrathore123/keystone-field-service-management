import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface ReportCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
}

const ReportCard = ({ title, value, icon, color }: ReportCardProps) => {
  return (
    <Card
      elevation={6}
      sx={{
        borderRadius: 4,
        height: "100%",
        transition: "0.25s ease",
        cursor: "pointer",
        overflow: "hidden",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 10,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={1}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight={600}
            >
              {title}
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {value}
            </Typography>
          </Stack>

          <Avatar
            sx={{
              bgcolor: color,
              width: 60,
              height: 60,
              boxShadow: 3,
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
