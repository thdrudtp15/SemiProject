import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const categories = [
  {
    name: "all",
    text: "메인",
  },
  {
    name: "product",
    text: "전체",
  },
  {
    name: "탁주",
    text: "탁주",
  },
  {
    name: "증류주",
    text: "증류주",
  },
  {
    name: "과실주",
    text: "과실주",
  },
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 0 1rem 0 1rem;
  width: 768px;
  margin: 0;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled(NavLink)`
  font-size: 1rem;
  cursor: pointer;
  padding: 0 0 0.5rem 0;
  white-space: pre;
  text-decoration: none;
  color: #2f2f2f;

  &:hover {
    font-weight: 600;
    color: #000000;
  }

  &.active {
    font-weight: 600;
    border-bottom: 6px solid #000000;
    color: #000000;
    &:hover {
      border-bottom: 5px solid #2f2f2f;
      color: #2f2f2f;
    }
  }
  & + & {
    margin-left: 1.5rem;
  }
`;
const Categories = () => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          className={({ isActive }) => (isActive ? "active" : undefined)}
          to={c.name === "all" ? "/" : `/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
