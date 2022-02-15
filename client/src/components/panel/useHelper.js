import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProduct,
  getAllTags,
  updateProduct,
  postProduct,
  postTags,
} from "../../redux/action";

const useHelper = () => {
  const dispatch = useDispatch();
  const allTags = useSelector((state) => state.allTags);
  const allProduct = useSelector((state) => state.allProduct);

  const [list, setList] = useState({
    productId: 0,
    name: "",
    tagsId: [],
  });

  const [tag, setTag] = useState({
    id_tag: 0,
    name: "",
  });

  const [product, setProduct] = useState({
    id: 0,
    name: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    id_tag: "",
    product_id: "",
    product_name: "",
    buttonTag: true,
    buttonProduct: true,
  });

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllTags());
  }, [dispatch]);

  const validate = (state, prop) => {
    switch (prop) {
      case "id_tag": {
        let id_tag = "";
        let buttonTag = false;
        if (!state.id_tag) id_tag = "ID de etiqueta requerido";
        if (state.id_tag.length > 10) {
          buttonTag = true;
          id_tag = "ID solo puede contener 10 caracteres";
          return { ...errors, id_tag, buttonTag };
        } else if (state.id_tag && !state.name) {
          buttonTag = true;
          return { ...errors, id_tag, buttonTag };
        } else return { ...errors, id_tag, buttonTag };
      }
      case "tag_name": {
        let name = "";
        let buttonTag = false;
        if (!state.name) name = "Turno del curso es requerido";
        if (state.name.length < 8) {
          buttonTag = true;
          name = "Nombre de etiqueta debe contener un minimo de 8 caracteres";
          return { ...errors, name, buttonTag };
        }
        if (!state.name && state.id_tag) {
          buttonTag = true;
          return { ...errors, name, buttonTag };
        } else if (state.name && !state.id_tag) {
          buttonTag = true;
          return { ...errors, name, buttonTag };
        } else return { ...errors, name, buttonTag };
      }
      case "product_name": {
        let product_name = "";
        let buttonProduct = false;
        if (!state.name) product_name = "Nombre del producto requerido";
        if (state.name.length < 5) {
          buttonProduct = true;
          product_name =
            "Nombre del producto debe contener un minimo de 5 caracteres";
          return { ...errors, product_name, buttonProduct };
        } else if (state.name && !state.id) {
          buttonProduct = true;
          return { ...errors, product_name, buttonProduct };
        } else return { ...errors, product_name, buttonProduct };
      }
      case "product_id": {
        let product_id = "";
        let buttonProduct = false;
        if (!state.id) product_id = "ID del producto es requerido";
        if (state.id.length > 10) {
          buttonProduct = true;
          product_id =
            "El id del producto debe contener un maximo de 10 caracteres";
          return { ...errors, product_id, buttonProduct };
        } else if (state.id && !state.name) {
          buttonProduct = true;
          return { ...errors, product_id, buttonProduct };
        } else return { ...errors, product_id, buttonProduct };
      }
      default: {
        return errors;
      }
    }
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    let result;
    if (type === "listName") {
      setList({ ...list, name: value });
    }
    if (type === "id_tag" || type === "tag_name") {
      result = { ...tag, [name]: value };
      setTag(result);
      setErrors(validate(result, type));
    }
    if (type === "product_name" || type === "product_id") {
      result = { ...product, [name]: value };
      setProduct(result);
      setErrors(validate(result, type));
    }
  };

  const handleSelect = (e, type) => {
    let id = e.target.value;
    if (type === "product") {
      const newProduct = allProduct.filter(
        (elemento) => elemento.id === Number(id)
      );
      setList({
        name: newProduct[0].name,
        productId: newProduct[0].id,
        tagsId: [...newProduct[0].tags],
      });
      e.target.value = "default";
    }
    if (type === "tags") {
      if (list.tagsId.find((elemento) => elemento.id_tag === Number(id))) {
        e.target.value = "default";
        return alert("etiqueta ya se encuentra en la lista");
      }
      const newTag = allTags.filter(
        (elemento) => elemento.id_tag === Number(id)
      );
      setList({
        ...list,
        tagsId: [...list.tagsId, ...newTag],
      });
      e.target.value = "default";
    }
    if (type === "delete") {
      let id = e.target.value;
      const filterTags = list.tagsId.filter(
        (elemento) => elemento.id_tag !== Number(id)
      );
      setList({ ...list, tagsId: filterTags });
      console.log(filterTags);
    }
    e.target.value = "default";
  };

  const handleRefresh = () => {
    dispatch(getAllProduct(), getAllTags());
    alert("Datos recargados correctamente");
  };

  const handleSubmit = (e, type) => {
    if (type === "update") {
      let tagsId = [];
      list.tagsId.map((elemento) => tagsId.push(elemento.id_tag));
      let objectSubmite = { ...list, tagsId: tagsId };
      setList({
        productId: 0,
        name: "",
        tagsId: [],
      });
      dispatch(updateProduct(objectSubmite));
    }
    if (type === "createTag") {
      e.preventDefault();
      let parseId = Number(tag.id_tag);
      let result = { ...tag, id_tag: parseId };
      dispatch(postTags(result));
      setTag({
        id_tag: 0,
        name: "",
      });
      return alert("Etiqueta creado");
    }
    if (type === "createProduct") {
      let parseId = Number(product.id);
      let result = { ...product, id: parseId };
      dispatch(postProduct(result));
      setProduct({
        id: 0,
        name: "",
      });
      return alert("Producto creado");
    }
  };

  return {
    handleInputChange,
    handleRefresh,
    handleSelect,
    handleSubmit,
    allProduct,
    allTags,
    errors,
    list,
  };
};

export default useHelper;
