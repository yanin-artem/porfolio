import axios from "axios";

const fetchCategories = async () => {
  return await axios("http://localhost:8080/categories", {
    method: "GET",
  });
};

const updateCategory = async (data, id) => {
  return await axios.patch("http://localhost:8080/categories/" + id, data);
};

const fetchCategory = async (id) => {
  return await axios.get("http://localhost:8080/categories/" + id);
};

const deleteCategory = async (id) => {
  return await axios.delete("http://localhost:8080/categories/" + id);
};

const createCategory = async (data) => {
  return await axios.post("http://localhost:8080/categories", data);
};

export const categoriesApi = {
  fetchCategory,
  fetchCategories,
  updateCategory,
  deleteCategory,
  createCategory,
};
