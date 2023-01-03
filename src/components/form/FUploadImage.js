import { FormHelperText } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import UploadSingleFile from "../UploadSingleFile";

function FUploadImage({ name, ...other }) {
  const { control } = useFormContext();
  console.log("UploadSingleFile", other);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return (
          <UploadSingleFile
            accept="image/*"
            file={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    ></Controller>
  );
}

export default FUploadImage;
