import React from "react";
import data from "../data.json";
import CatContext from "./CatContext";

class CategoriesProvider extends React.Component {
  removeItem = data => {
    let categoryId = parseInt(data.getAttribute("catId"));
    let itemId = parseInt(data.getAttribute("itemId"));
    let categoriesData = this.state.data;
    let itemsData = this.state.data.categories
      .find(x => x.id === categoryId)
      .items.filter(function(item) {
        return item.id !== itemId;
      });
    categoriesData.categories.find(x => x.id === categoryId).items = itemsData;
    this.setState({ data: categoriesData });
  };

  createCategory = data => {
    if (data.name !== "") {
      let categoriesData = this.state.data;
      let cat = {
        ...data,
        items: [
          {
            id: categoriesData.categories.length * 50,
            name: "Apple",
            description:
              "Homemade crispy nacho chips served with fresh salsa dip",
            price: categoriesData.categories.length * 5
          }
        ],
        id: categoriesData.categories.length
      };
      categoriesData.categories.push(cat);
      this.setState({ data: categoriesData });
    }
  };

  state = {
    data: data,
    removeItem: this.removeItem,
    createCategory: this.createCategory
  };

  render() {
    return (
      <CatContext.Provider value={this.state}>
        {this.props.children}
      </CatContext.Provider>
    );
  }
}

export { CategoriesProvider };
