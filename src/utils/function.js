import firebase from "./firebase";
import { useState, useEffect } from "react";
import { successToastify } from "./customToastify";

export const addProduct = (product) => {
  const contactRef = firebase.database().ref("market");
  contactRef.push(product);
  successToastify("added succesfully");
};

export const useFetch = () => {
  const [contactList, setContactList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const contactRef = firebase.database().ref("market");
    contactRef.on("value", (snapshot) => {
      const contacts = snapshot.val();

      const contactArray = [];
      for (let id in contacts) {
        contactArray.push({ id, ...contacts[id] });
      }
      setContactList(contactArray);
      setIsLoading(false);
    });
  }, []);
  return { contactList, isLoading };
};

export const deleteHandler = (id) => {
  const contactRef = firebase.database().ref("market").child(id);
  contactRef.remove();
  successToastify("delete succesfully");
};

export const editHandler = (item) => {
  const contactRef = firebase.database().ref("market").child(item.id);
  contactRef.update(item);
  successToastify("edit succesfully");
};
