import { useStore } from "../../../store/store";
import { MdOutlineClose } from "react-icons/md";
export const CurrentRecipe = () => {
  const data = useStore((state) => state.currentRecipe);
  const setCurrentRecipe = useStore((state) => state.setCurrentRecipe);
  return (
    <div className="currentRecipe_wrap">
      <div className="currentRecipe">
        <div className="leftSideRecipe">
          {" "}
          <img src={data.image_url} alt={data.name} />
          <h2>{data.name}</h2>
          <p>{data.tagline}</p>
        </div>
        <div className="rightSideRecipe">
          {" "}
          <p>{data.description}</p>
          <h3>Food Pairing</h3>
          <ul>
            {data.food_pairing.map((pairing, index) => (
              <li key={index}>{pairing}</li>
            ))}
          </ul>
          <MethodTable data={data.method} />
          <IngredientsTable data={data.ingredients} />
          <p>Brewers Tips: {data.brewers_tips}</p>
          <p>Contributed By: {data.contributed_by}</p>
        </div>
        <MdOutlineClose
          className="closeButton"
          onClick={() => setCurrentRecipe(null)}
        />
      </div>
    </div>
  );
};

const IngredientsTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Ingredient Type</th>
          <th>Name</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.malt &&
          data.malt.map((item, index) => (
            <tr key={index}>
              <td>Malt</td>
              <td>{item.name}</td>
              <td>
                {item.amount.value} {item.amount.unit}
              </td>
            </tr>
          ))}
        {data.hops &&
          data.hops.map((item, index) => (
            <tr key={index}>
              <td>Hops</td>
              <td>{item.name}</td>
              <td>
                {item.amount.value} {item.amount.unit}
              </td>
            </tr>
          ))}
        {data.yeast && (
          <tr>
            <td>Yeast</td>
            <td colSpan="2">{data.yeast}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const MethodTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Method</th>
          <th>Temperature</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mash Temp</td>
          <td>
            {data.mash_temp[0].temp.value} {data.mash_temp[0].temp.unit}
          </td>
          <td>{data.mash_temp[0].duration || "-"}</td>
        </tr>
        <tr>
          <td>Fermentation</td>
          <td>
            {data.fermentation.temp.value} {data.fermentation.temp.unit}
          </td>
          <td>-</td>
        </tr>
        <tr>
          <td>Twist</td>
          <td colSpan="2">{data.twist || "-"}</td>
        </tr>
      </tbody>
    </table>
  );
};
