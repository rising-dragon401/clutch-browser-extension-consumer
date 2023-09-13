import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Button from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../../../../components/NavigationHeader";
import Input from "../../../../components/Input";
import { useGuardianStore } from "@src/store/guardian";
import useForm from "@src/hooks/useForm";
import { nextRandomId } from "@src/lib/tools";

const getDefaultGuardianIds = (count) => {
  const ids = [];

  for (let i = 0; i < count; i++) {
    ids.push(nextRandomId());
  }

  return ids;
};

const getFieldsByGuardianIds = (ids) => {
  const fields = [];

  for (const id of ids) {
    const addressField = `address_${id}`;
    const nameField = `name_${id}`;
    fields.push(addressField);
    fields.push(nameField);
  }

  return fields;
};

const getInitialValues = (ids, guardians, guardianNames) => {
  console.log("=====================", guardians, guardianNames);
  const idCount = ids.length;
  const guardianCount = guardians.length;
  const count = idCount > guardianCount ? idCount : guardianCount;
  const values = {};

  for (let i = 0; i < count; i++) {
    if (ids[i]) {
      values[`address_${ids[i]}`] = guardians[i] ?? undefined;
      values[`name_${ids[i]}`] = guardianNames[i] ?? undefined;
    }
  }

  return values;
};

const validate = (values) => {
  const errors = {};
  const addressKeys = Object.keys(values).filter(
    (key) => key.indexOf("address") === 0
  );
  const nameKeys = Object.keys(values).filter(
    (key) => key.indexOf("name") === 0
  );
  const existedAddress = [];

  for (const addressKey of addressKeys) {
    const address = values[addressKey];

    if (address && address.length && !ethers.isAddress(address)) {
      errors[addressKey] = "Invalid Address";
    } else if (existedAddress.indexOf(address) !== -1) {
      errors[addressKey] = "Duplicated Address";
    } else if (address && address.length) {
      existedAddress.push(address);
    }
  }

  return errors;
};

function AddGuardian() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    guardians,
    guardianNames,
    threshold,

    setGuardians,
    setGuardianNames,
    setThreshold,

    editingGuardians,
    editingGuardianNames,
    editingThreshold,
    isEditing,

    setEditingGuardians,
    setEditingGuardianNames,
    setEditingThreshold,
    setIsEditing,

    editingGuardiansInfo,
    setEditingGuardiansInfo,
    cancelEditingGuardiansInfo,
    setCancelEditingGuardiansInfo,
  } = useGuardianStore();

  const defaultGuardianIds = getDefaultGuardianIds(guardians.length + 1);
  const [guardianIds, setGuardianIds] = useState(defaultGuardianIds);
  const [fields, setFields] = useState(
    getFieldsByGuardianIds(defaultGuardianIds)
  );
  const [guardiansList, setGuardiansList] = useState([]);

  const {
    values,
    errors,
    invalid,
    onChange,
    onBlur,
    showErrors,
    addFields,
    removeFields,
    clearFields,
  } = useForm({
    fields,
    validate,
    initialValues: getInitialValues(
      defaultGuardianIds,
      guardians,
      guardianNames
    ),
  });

  const handleSubmit = async () => {
    try {
      const guardiansList = guardianIds
        .map((id) => {
          const addressKey = `address_${id}`;
          const nameKey = `name_${id}`;
          let address = values[addressKey];

          if (address && address.length) {
            return { address, name: values[nameKey] };
          }

          return null;
        })
        .filter((i) => !!i);

      const guardianAddresses = guardiansList.map((item) => item.address);
      const guardianNames = guardiansList.map((item) => item.name);
      const threshold = amountForm.values.amount || 0;

      console.log("guardianAddresses", guardianAddresses);
      console.log("guardianNames", guardianNames);
      console.log("threshold", threshold);
    } catch (e) {}
    // navigate("/add_guardian");
  };

  return (
    <>
      <NavigationHeader label="Guardians" info />
      <Box
        sx={{
          padding: "16px",
          height: "372px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Input
            placeholder="Name"
            onChange={onChange(`name_${guardianIds[guardianIds.length - 1]}`)}
          />
          <Input
            placeholder="Enter address or ENS"
            onChange={onChange(`address_${guardianIds[guardianIds.length - 1]}`)}
          />
        </Box>

        <Button
          size="fullWidth"
          variant="secondary"
          label="Create"
          style={{
            marginBottom: "9px",
            fontSize: "14px",
            color: theme.palette.text_colors.primary_475,
          }}
          onClick={handleSubmit}
        />
      </Box>
    </>
  );
}

export default AddGuardian;
