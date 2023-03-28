// fb imports
import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// fb auth functions
export const registerUser = async (userEmail, userPassword) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
    return user;
  } catch (error) {
    throw new Error("There was a problem creating your account");
  }
};

const loginUser = async () => {};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error("There was a problem signing out from your account");
  }
};

const deleteUser = async () => {};

// generates a random olor
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
};

// logout user
export const logOut = async ({ key }) => {
  await logoutUser();
  return localStorage.removeItem(key);
};
