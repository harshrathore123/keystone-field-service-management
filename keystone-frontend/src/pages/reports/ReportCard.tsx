import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";

interface ReportCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
}

const ReportCard = ({
  title,
  value,
  icon,
  color,
}: ReportCardProps) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        height: "100%",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
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
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {value}
            </Typography>
          </Stack>

          <Avatar
            sx={{
              bgcolor: color,
              width: 58,
              height: 58,
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