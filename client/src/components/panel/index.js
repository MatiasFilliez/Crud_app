import styles from "./index.module.css";
import useHelper from "./useHelper";

export default function Panel() {
  const {
    handleInputChange,
    handleRefresh,
    handleDelete,
    handleSelect,
    handleSubmit,
    allProduct,
    allTags,
    errors,
    list,
  } = useHelper();

  return (
    <div className={styles.container}>
      <h1>CRUD APP BC</h1>
      <div className={styles.selectItemProduct}>
        <select
          name="product"
          defaultValue={"default"}
          onChange={(e) => handleSelect(e, "product")}
          className={styles.selectTag}
        >
          <option value="default" disabled>
            Productos
          </option>
          {allProduct &&
            allProduct.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
        </select>
        <select
          name="tags"
          defaultValue="default"
          onChange={(e) => handleSelect(e, "tags")}
          className={styles.selectTag}
        >
          <option value="default" disabled>
            Etiquetas
          </option>
          {allTags &&
            allTags.map((e) => (
              <option key={e.id_tag} value={e.id_tag}>
                {e.name}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.ListProduct}>
        <input
          value={list.name}
          onChange={(e) => handleInputChange(e, "listName")}
          placeholder="Nombre de producto"
          className={styles.productName}
        />
        <button value={list.productId} onClick={(e) => handleDelete(e)}>
          X
        </button>
      </div>
      <div className={styles.boxList}>
        {list.tagsId.length ? (
          list.tagsId?.map((tag) => (
            <div className={styles.containList}>
              <button
                value={tag.id_tag}
                className={styles.delete}
                onClick={(e) => handleSelect(e, "delete")}
              >
                X
              </button>
              <h3 key={tag.id_tag} className={styles.tags}>
                {tag.name}
              </h3>{" "}
              <h3>{tag.id_tag}</h3>
            </div>
          ))
        ) : (
          <p>Agregue una etiqueta</p>
        )}
      </div>
      <div className={styles.buttonUpdate}>
        <button onClick={() => handleRefresh()}>Refrescar cambios</button>
      </div>
      <div className={styles.submiteButton}>
        <button onClick={(e) => handleSubmit(e, "update")}>
          Guardar cambios
        </button>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e, "createTag")}
        className={styles.createTag}
      >
        <input
          name="id_tag"
          type="number"
          placeholder="ID Etiqueta"
          onChange={(e) => handleInputChange(e, "id_tag")}
        />
        <input
          name="name"
          placeholder="Nombre de etiqueta"
          onChange={(e) => handleInputChange(e, "tag_name")}
        />
        <button type="submit" disabled={errors.buttonTag}>
          Crear etiqueta
        </button>
      </form>
      <form
        onSubmit={(e) => handleSubmit(e, "createProduct")}
        className={styles.createProduct}
      >
        <input
          name="id"
          type="number"
          placeholder="ID Producto"
          onChange={(e) => handleInputChange(e, "product_id")}
        />
        <input
          name="name"
          placeholder="Nombre de producto"
          onChange={(e) => handleInputChange(e, "product_name")}
        />
        <button type="submit" disabled={errors.buttonProduct}>
          Crear producto
        </button>
      </form>
      {errors.product_id.length > 0 ? (
        <p className={styles.errorsP}>{errors.product_id}</p>
      ) : (
        ""
      )}
      {errors.product_name.length > 0 ? (
        <p className={styles.errorsPName}>{errors.product_name}</p>
      ) : (
        ""
      )}
      {errors.id_tag.length > 0 ? (
        <p className={styles.errorsT}>{errors.id_tag}</p>
      ) : (
        ""
      )}
      {errors.name.length > 0 ? (
        <p className={styles.errorsTName}>{errors.name}</p>
      ) : (
        ""
      )}
    </div>
  );
}
