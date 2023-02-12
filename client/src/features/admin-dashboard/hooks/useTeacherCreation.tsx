import { useState } from "react";
import { notification } from "antd";
import { useMutation } from "@tanstack/react-query";

import { checkAccountEmail } from "common";
import { createProfessor, uploadProfessorsFile } from "../api/professorsAPI";

const useTeacherCreation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [privatePhone, setPrivatePhone] = useState("");
  const [publicPhone, setPublicPhone] = useState("");
  const [departament, setDepartament] = useState("");
  const [numPositions, setNumPositions] = useState(1);

  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [notCreatedAccounts, setNotCreatedAccounts] = useState("");
  const [detectedAccounts, setDetectedAccounts] = useState(0);
  const [createdAccounts, setCreatedAccounts] = useState(0);

  const resetFields = () => {
    setName("");
    setEmail("");
    setTitle("");
    setPublicPhone("");
    setPrivatePhone("");
    setDepartament("");
    setNumPositions(1);
  };

  const { mutate: mutateCheckUniqueEmail, status: emailCheckResult } =
    useMutation(["checkUniqueEmail", email], (email: string) =>
      checkAccountEmail(email)
    );

  const { mutate: mutateCreateProfessor } = useMutation(
    ["createProfessor"],
    () => {
      setLoading(true);

      return createProfessor({
        name,
        email,
        title,
        privatePhone,
        publicPhone,
        departament,
        numPositions,
      });
    },
    {
      onSuccess: (res) => {
        setLoading(false);

        notification.success({
          message: "Professor created",
          description: `Great! We've just created a new professor with id ${res._id}`,
          duration: 10,
        });

        resetFields();
      },
      onError: () => {
        setLoading(false);

        notification.error({
          message: "Ooops ...",
          description:
            "Error while creating the professor! Please try again ...",
          duration: 10,
        });

        resetFields();
      },
    }
  );

  const { mutate: mutateUploadProfessors } = useMutation(
    ["uploadProfessorsFile"],
    (options: any) => {
      setLoading(true);

      const { onSuccess, onError, file } = options;

      return uploadProfessorsFile(file, onSuccess, onError);
    },
    {
      onSuccess: (res: any) => {
        setLoading(false);

        setNotCreatedAccounts(res.fails.join("   ;   "));
        setDetectedAccounts(res.detected);
        setCreatedAccounts(res.success.length);
        setOpenModal(true);
      },
      onError: () => {
        setLoading(false);

        notification.error({
          message: "Ooops ...",
          description:
            "The file could not be uploaded to the server ... Please try again!",
          duration: 10,
        });

        resetFields();
      },
    }
  );

  return {
    name,
    email,
    title,
    setName,
    loading,
    setEmail,
    setTitle,
    openModal,
    departament,
    publicPhone,
    setOpenModal,
    privatePhone,
    numPositions,
    setPublicPhone,
    setDepartament,
    setPrivatePhone,
    setNumPositions,
    createdAccounts,
    detectedAccounts,
    emailCheckResult,
    notCreatedAccounts,
    mutateCreateProfessor,
    mutateCheckUniqueEmail,
    mutateUploadProfessors,
  };
};

export default useTeacherCreation;
