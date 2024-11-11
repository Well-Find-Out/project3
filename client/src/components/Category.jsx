import { useQuery } from "@apollo/client";
import { QUERY_CATEGORY } from "../utils/queries.js";

function Category() {
  const { loading, error, data } = useQuery(QUERY_CATEGORY);
  
  const categoryList = data?.categoryList || [];
  const array = [];
  categoryList.forEach((element) => {
    array.push(element.category);
  });

  const categories = [...new Set(array)];

  return (
    <>
      <h5 className="mt-5 mx-3">CATEGORIES</h5>
      {!loading && !error && (
        <ul className="px-2 list-group w-50">
          {categories.map((category) => (
            <li className="list-group-item" key={category}>
              <a href={`/trips/${category.toLowerCase()}`}>{category}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Category;
