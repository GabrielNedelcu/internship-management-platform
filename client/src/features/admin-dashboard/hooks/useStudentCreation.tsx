import { useState } from "react";
import { notification } from "antd";
import { useMutation } from "@tanstack/react-query";

import { checkAccountEmail } from "common";
import { createStudent } from "../api/studentAPI";

const useStudentCreation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [cnp, setCNP] = useState("");
  const [passport, setPassport] = useState("");

  const resetFields = () => {
    setName("");
    setEmail("");
    setGroup("");
    setCNP("");
    setPassport("");
  };

  const { mutate: mutateCreateStudent } = useMutation(
    ["createStudent"],
    () => {
      return createStudent({ name, email, group, cnp, passport });
    },
    {
      onSuccess: (res) => {
        notification.success({
          message: "Student created",
          description: `Great! We've just created a new student with id ${res._id}`,
          duration: 10,
        });

        resetFields();
      },
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description: "Error while creating the student! Please try again ...",
          duration: 10,
        });

        resetFields();
      },
    }
  );

  const { mutate: mutateCheckUniqueEmail, status: emailCheckResult } =
    useMutation(["checkUniqueEmail", email], (email: string) =>
      checkAccountEmail(email)
    );

  return {
    cnp,
    passport,
    setName,
    setEmail,
    setGroup,
    setCNP,
    setPassport,
    emailCheckResult,
    mutateCreateStudent,
    mutateCheckUniqueEmail,
  };
};

export default useStudentCreation;
