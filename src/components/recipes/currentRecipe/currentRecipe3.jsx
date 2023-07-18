import { useStore } from "../../../store/store";

export const CurrentRecipe = () => {
  const recipe = useStore((state) => state.currentRecipe);
  const noInfo = "no information";

  return (
    <div className="currentRecipe_wrap">
      <img src={recipe.image_url} />
      <header>{recipe.name}</header>
      <p>{recipe.tagline}</p>
      <p>{recipe.description}</p>
      <p> First brewed {recipe.first_brewed}</p>
      <div>ABV: {recipe.abv}</div>
      <div>IBU: {recipe.ibu}</div>
      <div>Target fg: {recipe.target_fg}</div>
      <div>Target og: {recipe.target_og}</div>
      <div>EBC: {recipe.ebc}</div>
      <div>SRM: {recipe.srm}</div>
      <div>PH: {recipe.ph}</div>
      <div>Attenuation level {recipe.attenuation_level}</div>
      <div>
        Volume: {recipe.volume.value} {recipe.volume.unit}
      </div>
      <div>
        Boil volume: {recipe.boil_volume.value} {recipe.boil_volume.unit}
      </div>
      <VolumeTable data={recipe.volume} />
      <MethodsTable data={recipe.method} />
      {/* <div>
        Method:
        <div>
          {" "}
          Mash temperature: {recipe.method.mash_temp[0].temp.value}{" "}
          {recipe.method.mash_temp[0].temp.unit}, duration:{" "}
          {recipe.method.mash_temp[1]?.duration || noInfo}
        </div>
        <div>
          Fermentation: {recipe.method.fermentation.temp.value}{" "}
          {recipe.method.fermentation.temp.unit}
        </div>
        <div>Twist: {recipe.method.twist || noInfo}</div>
      </div> */}
      <IngridientsTable data={recipe.ingredients} />
    </div>
  );
};
const VolumeTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td>{key.replace("_", " ")}</td>
            <td>
              {value.value} {value.unit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const MethodsTable = ({ data }) => {
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
        <td>{data.mash_temp[0].duration}</td>
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
        <td colSpan="2">{data.twist}</td>
      </tr>
    </tbody>
  </table>
  );
};









const IngridientsTable = ({ data }) => {
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
            <td>{data.yeast}</td>
            <td></td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
