import { useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import type { Technician } from "../../types/Technician";

interface TechnicianFormProps {
  technician: Technician | null;
  onSave: (technician: Technician) => void;
  onCancel: () => void;
}

const initialState: Technician = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  role: "TECHNICIAN",
  active: true,
};

function TechnicianForm({ technician, onSave, onCancel }: TechnicianFormProps) {
  const [formData, setFormData] = useState<Technician>(initialState);

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setFormData(technician ?? initialState);

      setErrors({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
      });
    }, 0);

    return () => clearTimeout(id);
  }, [technician]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    const newErrors = {
      firstName:
        formData.firstName.trim() === "" ? "First Name is required" : "",

      lastName: formData.lastName.trim() === "" ? "Last Name is required" : "",

      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? ""
        : "Enter valid email",

      password:
        !technician && !formData.password?.trim() ? "Password is required" : "",

      phoneNumber: /^\d{10}$/.test(formData.phoneNumber)
        ? ""
        : "Enter valid 10 digit phone number",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    onSave(formData);
  };

  return (
    <Box p={4}>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700}>
          {technician ? "Update Technician" : "Add Technician"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Manage technician profile and login information
        </Typography>
      </Box>

      <Stack spacing={2.5}>
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />

        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        {!technician && (
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}

        <TextField
          label="Phone Number"
          name="phoneNumber"
          fullWidth
          value={formData.phoneNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");

            setFormData((prev) => ({
              ...prev,
              phoneNumber: value,
            }));

            setErrors((prev) => ({
              ...prev,
              phoneNumber: "",
            }));
          }}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          inputProps={{
            maxLength: 10,
          }}
        />

        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>

          <Select
            label="Role"
            value={formData.role}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                role: e.target.value,
              }))
            }
          >
            <MenuItem value="TECHNICIAN">Technician</MenuItem>

            <MenuItem value="ADMIN">Admin</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={formData.active}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  active: e.target.checked,
                }))
              }
            />
          }
          label="Active"
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            color="inherit"
            onClick={onCancel}
            sx={{
              borderRadius: 3,
              px: 3,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              borderRadius: 3,
              px: 4,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {technician ? "Update" : "Save"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default TechnicianForm;
