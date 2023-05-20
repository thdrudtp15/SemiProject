// import React, { useState, forwardRef } from "react";
// import "../../assets/styles/category-selector.css";
// import takju from "../../assets/images/takju_color.png";
// import jeungryuju from "../../assets/images/jeungryuju_color.png";
// import gwasilju from "../../assets/images/gwasilju_color.png";
// import InputLabel from "../common/InputLabel";

// // function CategorySelector(props) {
// const CategorySelector = forwardRef((props, ref) => {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const options = [
//     {
//       value: "탁주",
//       src: takju,
//     },
//     {
//       value: "증류주",
//       src: jeungryuju,
//     },
//     {
//       value: "과실주",
//       src: gwasilju,
//     },
//   ];
//   const handleOptionClick = (optionValue) => {
//     if (selectedOption === optionValue) {
//       setSelectedOption("");
//       props.handleCategoryChange((prevData) => ({
//         ...prevData,
//         prod_category: "",
//       }));
//     } else {
//       setSelectedOption(optionValue);
//       props.handleCategoryChange((prevData) => ({
//         ...prevData,
//         prod_category: optionValue,
//       }));
//     }
//   };
//   // const handleOptionClick = (optionValue) => {
//   //   setSelectedOption(selectedOption === optionValue ? "" : optionValue);
//   //   props.handleCategoryChange((prevData) => ({
//   //     ...prevData,
//   //     product_category: optionValue,
//   //   }));
//   // };

//   return (
//     <div>
//       <InputLabel label={props.label} className={"category"} />
//       <div className="option_selector">
//         {options.map(({ value, src }) => (
//           <div className={`option_container_${selectedOption === value ? "selected" : "not_selected"}`}>
//             <button type="button" ref={ref}>
//               <img src={src} alt={value} onClick={() => handleOptionClick(value)} />
//               {selectedOption === value && (
//                 <p className="selected_alt" onClick={() => handleOptionClick(value)}>
//                   {value}
//                 </p>
//               )}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// });

// export default CategorySelector;
import React, { useState, forwardRef } from "react";
import "../../assets/styles/category-selector.css";
import takju from "../../assets/images/takju_color.png";
import jeungryuju from "../../assets/images/jeungryuju_color.png";
import gwasilju from "../../assets/images/gwasilju_color.png";
import InputLabel from "../common/InputLabel";

// function CategorySelector(props) {
const CategorySelector = forwardRef((props, ref) => {
  const [selectedOption, setSelectedOption] = useState(props.initialValue);

  const options = [
    {
      value: "탁주",
      src: takju,
    },
    {
      value: "증류주",
      src: jeungryuju,
    },
    {
      value: "과실주",
      src: gwasilju,
    },
  ];
  const handleOptionClick = (optionValue) => {
    if (selectedOption === optionValue) {
      setSelectedOption("");
      props.handleCategoryChange((prevData) => ({
        ...prevData,
        prod_category: "",
      }));
    } else {
      setSelectedOption(optionValue);
      props.handleCategoryChange((prevData) => ({
        ...prevData,
        prod_category: optionValue,
      }));
    }
  };

  return (
    <div>
      <InputLabel label={props.label} className={"category"} />
      <div className="option_selector">
        {options.map(({ value, src }) => (
          <div className={`option_container_${selectedOption === value ? "selected" : "not_selected"}`}>
            <button type="button" ref={ref}>
              <img src={src} alt={value} onClick={() => handleOptionClick(value)} />
              {selectedOption === value && (
                <p className="selected_alt" onClick={() => handleOptionClick(value)}>
                  {value}
                </p>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default CategorySelector;
