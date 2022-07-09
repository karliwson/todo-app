import React, { useState, useContext } from "react";

import { Context } from "../../context/ContextProvider";

import Category from "../Category";

import addIcon from "../../assets/addIcon.svg";

import SidebarStyles from "./styles";

function Sidebar() {
  const { categories, setCategories, setPath } = useContext(Context);

  const [title, setTitle] = useState("");

  function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();

    if (!title) return;
    if (categories.map((category) => category.title).includes(title)) return;

    addCategory();

    setTitle("");
    switchToNewCategory();
  }

  const addCategory = () => {
    const slug = "/" + title.toLowerCase().replace(" ", "-");

    const category = {
      taskAmout: 0,
      title: title,
      slug: slug,
      color: "6D6D6D",
    };

    setCategories([...categories, category]);
  };

  const switchToNewCategory = () => {
    const slug = "/" + title.toLowerCase().replace(" ", "-");
    setPath(slug);
  };

  return (
    <SidebarStyles>
      <nav>
        {categories.map((category) => (
          <Category
            key={category.slug}
            category={{
              taskAmout: category.taskAmout,
              title: category.title,
              slug: category.slug,
              color: category.color,
            }}
          />
        ))}
      </nav>
      <form onSubmit={handleAddCategory} noValidate>
        <img src={addIcon} alt="Choose Icon" width={15} />
        <input
          type="text"
          placeholder="Create new category..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </form>
    </SidebarStyles>
  );
}

export default Sidebar;